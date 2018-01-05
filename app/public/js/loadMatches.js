$(document).ready(function() {
  const renderMatches = res => {
    $('#matchContainer').empty()
    for (let i = 0; i < res.length; i++) {
      let img = $("<img class='matchImg'>")
        .attr('src', res[i].url)
      img.attr('data-id', res[i].id)
      $('#matchContainer').append(img)
    }
  }

  const fetchUrls = res => {
    let matchArr = []
    for (let i = 0; i < res.length; i++) {
      matchArr.push(res[i].matchId)
    }
    $.ajax({
      type: 'POST',
      url: '/get-matches-url',
      data: {arr: matchArr},
      success: renderMatches
    })
  }

  function getMatches() {
    $.ajax({
      type: 'GET',
      url: '/get-matches',
      success: fetchUrls
    })
  }
  getMatches()

  $('#like').on('click', function(e) {
    e.stopPropagation();
    setTimeout(getMatches, 3000);
  })

})