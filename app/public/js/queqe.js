$(document).ready(function () {
  let count = 0;
  let count2 = 0;

  //render functions

  function renderQueqe (response) {
    let html = `<img class='imgQueqe' src=${response.url} data-id=${response.id}>`
    $('#queqe').prepend(html)
  };

  function renderOne (response) {
    let html = `<img class='imgQueqe' style='display:block' src=${response.url} data-id=${response.id}>`
    $('#queqe').append(html)
  };

  function renderOnView (res) {
    let $img = $('.profileOnView img');
    $img.removeAttr('src');
    $img.attr('src', res.url);
    $img.attr('data-id', res.id)
    if (count > 0) {
      fetchOne();
    }
    count++
  }

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
      success: renderOnView
    })
  }

  function createMatch(res) {
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
      codeStatus: {
        404: fetchNext()
      },
      success: createMatch
    })
  }

  //on-click profile on view ajax

  $('.selectContainer').on('click', '.imgQueqe', function(evt) {
    evt.stopPropagation();
    let id = {id: $(this).attr('data-id')}
    $.ajax({
      type: 'POST',
      url: '/load-on-view',
      data: id,
      success: renderOnView
    })
    $(this).remove()
  })

  //on-click like ajax post

  $('#like').on("click", function(evt) {
    evt.stopPropagation();
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
  });


  $('#dislike').on("click", function(evt) {
    evt.stopPropagation();
    let obj = {choiceId: $('.profileOnView img').attr('data-id')};
    $.ajax({
      type: 'POST',
      url: '/dislike',
      data: obj,
      success: fetchNext
    });
  });

  ! function () {
    let obj = readAttrs();
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
        success: i === 0 ? renderOnView : renderQueqe
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
        success: renderOne,
        statusCode: {
          500: function() {
            alert('severError')
          }
        }
      });
    }, 300)
  }
});
