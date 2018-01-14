$(document).ready(function () {

  //code for user profile

  const renderProf = res => {
    bio(res.bio)
    img(res)
    imgs(res.arr)
  };

  const bio = bio => {
    $('#profileStats').find('p').append(bio.bio)
    hdb(bio)
  }

  const hdb = data => {
    var source = document.getElementById('bio-template').innerHTML
    var template = Handlebars.compile(source)
    var context = data
    var html = template(context)
    $('#bioBox').append(html)
  }

  const img = res => {
    let $img = $('.profileBox').children().eq(0);
    $img.removeAttr("src");
    $img.attr('src', res.arr[0]).attr('data-id', res.id)
  }

  const imgs = data => {
    for (let i=0; i < data.length; i++) {
      let img = $("<img class='imgBoxImg'>").attr('src', data[i])
      $('#imgsContain').append(img)
    }
  }

  !(() => {
    $.ajax({
      type: 'GET',
      url: '/get-profile',
      success: renderProf
    })
  }())



  //code for profile on view
});