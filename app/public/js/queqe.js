$(document).ready(function () {
  let count = 0;
  let count2 = 0;
  let turn = true;

  //render functions

  class Render {
    static queqe(response) {
      let html = `<img class='imgQueqe' src=${response.url} data-id=${response.id}>`
      $('#queqe').prepend(html)
    }
    static one(response) {
      let html = `<img class='imgQueqe' style='display:block' src=${response.url} data-id=${response.id}>`
      $('#queqe').append(html)
    }
    static onView (res) {
      let $img = $('.profileOnView img');
      $img.removeAttr('src');
      if (res === 'n/a') {
        $img.attr('src', './assets/imgs/profile-female.jpg');
        turn = false;
        return
      }
      $img.attr('src', res.url);
      $img.attr('data-id', res.id)
      turn = true
      if (count > 0) {
        fetchOne();
      }
      count++
    }
  }

  // function renderQueqe (response) {
  //   let html = `<img class='imgQueqe' src=${response.url} data-id=${response.id}>`
  //   $('#queqe').prepend(html)
  // };

  // function renderOne (response) {
  //   let html = `<img class='imgQueqe' style='display:block' src=${response.url} data-id=${response.id}>`
  //   $('#queqe').append(html)
  // };

  // function renderOnView (res) {
  //   let $img = $('.profileOnView img');
  //   $img.removeAttr('src');
  //   if (res === 'n/a') {
  //     $img.attr('src', './assets/imgs/profile-female.jpg');
  //     turn = false;
  //     return
  //   }
  //   $img.attr('src', res.url);
  //   $img.attr('data-id', res.id)
  //   turn = true
  //   if (count > 0) {
  //     fetchOne();
  //   }
  //   count++
  // }

  function alertFunc(res) {
    alert('match!');
    fetchNext()
  }

  //read data-id from queqe

  function readAttrs() {
    let arr = [];
    let iter = $('#queqe').children();

    arr.push(0);

    if (count2 > 0) {
      let $img = $('.profileOnView img');
      arr.push(parseFloat($img.attr('data-id')))
      for (var i=0; i < iter.length; i++) {
        let id = iter.eq([i]).attr('data-id');
        arr.push(parseFloat(id));
      }
    }

    $.ajax({
      type: 'GET',
      url: '/get-likes',
      success: function(res) {
        for (let i=0; i < res.length; i++) {
          arr.push(res[i].likeId)
        }
      }
    })

    count2++;
    return arr
  }

  function fetchNext() {
    console.log('fetch next fired')
    let $next = $('#queqe').children().eq(0);
    let obj = {nextId: $next.attr('data-id')}
    $next.remove();
    $.ajax({
      type: 'POST',
      url: '/fetch-next',
      data: obj,
      success: Render.onView
    })
  }

  function createMatch(res) {
    if (res === 'n/a') { fetchNext(); return }
    $.ajax({
      type: 'POST',
      url: '/create-match',
      data: res,
      success: alertFunc,
      error: {
        500: function(xhr, textStatus, errorThrown) {
          alert(errorThrown)
        }
      }
    })
  }

  function matchChecker(res) {
    let obj = {choiceId: $('.profileOnView img').attr('data-id')};
    $.ajax({
      type: 'POST',
      url: '/match-checker',
      data: obj,
      success: createMatch
    })
  }

  function like() {
    let obj = {choiceId: $('.profileOnView img').attr('data-id')};
    $.ajax({
      type: 'POST',
      url: '/like',
      data: obj,
      success: matchChecker,
      error: {
        500: function(xhr, textStatus, errorThrown) {
          alert(errorThrown)
        }
      }
    });
  }

  function dislike() {
    let obj = {choiceId: $('.profileOnView img').attr('data-id')};
    $.ajax({
      type: 'POST',
      url: '/dislike',
      data: obj,
      success: fetchNext
    });
  }

  //on-click profile on view ajax

  $('.selectContainer').on('click', '.imgQueqe', function(evt) {
    evt.stopPropagation();
    let id = {id: $(this).attr('data-id')}
    $.ajax({
      type: 'POST',
      url: '/load-on-view',
      data: id,
      success: Render.onView
    })
    $(this).remove()
  })

  //on-click like ajax post

  $('#like').on("click", function(evt) {
    evt.stopPropagation();
    if (turn) {
      $('#green').fadeIn(200).fadeOut(200)
      setTimeout(like, 200)
      turn = !turn
    }
  });

  $('#dislike').on("click", function(evt) {
    evt.stopPropagation();
    if (turn) {
      $('#red').fadeIn(200).fadeOut(200)
      setTimeout(dislike, 200)
      turn = !turn
    }
  });

  ! function () {
    let obj = {arr: [0,1]};
    setTimeout(function () {
      $.ajax({
        type: 'POST',
        url: '/queqe',
        data: obj,
        success: getAWS
      });
    }, 600)
  }();

  function getAWS (data) {
    if (data === 'n/a') { console.log('return'); return }
    for (let i = 0; i < data.length; i++) {
      let temp = {data: data[i]};
      $.ajax({
        type: 'POST',
        url: '/get-aws-user',
        data: temp,
        success: i === 0 ? Render.onView : Render.queqe
      });
    }
  }

  function fetchOne() {
    let obj = {arr: readAttrs()};
    console.log(obj)
    setTimeout(function() {
      $.ajax({
        type: 'POST',
        url: '/get-one',
        data: obj,
        success: Render.one,
        statusCode: {
          500: function() {
            alert('severError')
          }
        }
      });
    }, 300)
  }
});
