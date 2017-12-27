$(document).ready(function () {
  var profileTurn = true,
    viewTurn = true,
    selectTurn = true

  $('.profileBox').hide()
  $('.viewFocusDetails').hide()

  $('.profileContainer').on('click', function () {
    if (profileTurn) {
      $('.profileBox').show(900)
      $(this).animate({ 'width': '30%' },
        1000, function () {
          profileTurn = !profileTurn
        })
      $('.selectContainer').animate({'width': '70%'}, 1000, null)
      $('.viewContainer').animate({'left': '65%'}, 1000, null)
      return
    }

    $('.profileBox').hide(900)
    $(this).animate({ 'width': '3%' },
      1000, function () {
        profileTurn = !profileTurn
      })
    $('.selectContainer').animate({'width': '97%'}, 1000, null)
    $('.viewContainer').animate({'left': '50%'}, 1000, null)
  })

  $('.selectContainer').on('click', function () {
    if (selectTurn) {
      $(this).animate({ 'height': '20%' },
        1000, function () {
          selectTurn = !selectTurn
        })
      $('.viewContainer').animate({'top': '60%'}, 1000, null)
      return
    }

    $(this).animate({ 'height': '3%' },
      1000, function () {
        selectTurn = !selectTurn
      })
    $('.viewContainer').animate({'top': '50%'}, 1000, null)
  })

  $('.viewContainer').on('click', function () {
    if (viewTurn) {
      $('.profileContainer').hide(1000)
      $('.selectContainer').hide(1000)
      $('.viewFocusDetails').show(1000)
      $(this).animate({
        'top': '35%',
        'left': '18%',
        'height': '300px',
        'width': '200px'
      }, 1000, null)
      $('.profileOnView').animate({
        'height': '190px',
        'width': '190px',
        'top': '33%',
        'left': '50%'
      }, 1000, null)
      $('.userChoiceButtons').hide(200)
      // $('.userChoiceButtons').animate({
      // 	"width": "208px"
      // })
      // $('.userChoiceButtons div').animate({
      // 	"margin": "0px 4px",
      // 	"left": "31%", "top": "75%",
      // 	"-webkit-transform": "translate(-50%, -50%)"
      // })

      viewTurn = !viewTurn
      return
    }

    function returnProfileOnView () {
      $('.profileOnView').animate({
        'height': '250px',
        'width': '250px',
        'top': '50%',
        'left': '35%'
      }, 1000, null)
      $('.userChoiceButtons').show(1200)
      // $('.userChoiceButtons').animate({
      // 	"width": "100px"
      // })
      // $('.userChoiceButtons div').animate({
      // 	"margin": "10px 0px 10px 0px",
      // 	"left": "50%", "top": "-5%",
      // 	"-webkit-transform": "translate(-50%, 0%)"
      // })
    }

    $('.profileContainer').show(1000)
    $('.selectContainer').show(1000)
    $('.viewFocusDetails').hide(1000)
    if (profileTurn && selectTurn) {
      $(this).animate({
        'top': '50%',
        'left': '50%',
        'height': '300px',
        'width': '400px'
      }, 1000, null)
      returnProfileOnView()
    } else if (!selectTurn && !profileTurn) {
      $('.viewContainer').animate({
        'top': '60%',
        'left': '65%',
        'height': '300px',
        'width': '400px'
      }, 1000, null)
      returnProfileOnView()
    } else if (!profileTurn) {
      $('.viewContainer').animate({
        'top': '50%',
        'left': '65%',
        'height': '300px',
        'width': '400px'
      }, 1000, null)
      returnProfileOnView()
    } else if (!selectTurn) {
      $('.viewContainer').animate({
        'top': '60%',
        'left': '50%',
        'height': '300px',
        'width': '400px'
      }, 1000, null)
      returnProfileOnView()
    }
    viewTurn = !viewTurn
  })
})
