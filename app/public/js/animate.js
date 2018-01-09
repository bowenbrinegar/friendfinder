$(document).ready(function () {
  var profileTurn = true,
    viewTurn = true,
    selectTurn = true,
    profileViewTurn = true,
    matchesTurn = true

  const $profileBox = $('.profileBox');
  const $profileContainer = $('.profileContainer');
  const $profileOnView = $('.profileOnView');
  const $buttons = $('.userChoiceButtons')
  const $selectContainer = $('.selectContainer');
  const $viewContainer = $('.viewContainer');
  const $focusDetails = $('.viewFocusDetails');
  const $editor = $('#editor')
  const $profileStats = $('#profileStats')

  const $matchesView = $('#matchesView');
  const $profileView = $('#profileView');

  $profileBox.hide()
  $focusDetails.hide()

  $profileContainer.on('click', function () {
    if (profileTurn) {
      $profileBox.show(900)
      $editor.show('slide', {direction: 'left'}, 1000, null);
      $profileStats.show('slide', {direction: 'left'}, 1000, null);

      $(this).animate({ 'width': '30%' },
        1000, function () {
          profileTurn = !profileTurn
        })

      $selectContainer.animate({'width': '70%'}, 1000, null)
      $viewContainer.animate({'left': '65%'}, 1000, null)
      return
    }

    $profileBox.hide(900)
    $editor.hide('slide', {direction: 'left'}, 1000, null);
    $profileStats.hide('slide', {direction: 'left'}, 1000, null);

    $(this).animate({ 'width': '3%' },
      1000, function () {
        profileTurn = !profileTurn
      })
    $selectContainer.animate({'width': '97%'}, 1000, null);
    $viewContainer.animate({'left': '50%'}, 1000, null)
  })

  $selectContainer.on('click', function () {
    const $queqe = $selectContainer.children().eq(0).children().eq(0).children()
    if (selectTurn) {
      $(this).animate({ 'height': '20%' },
        1000, function () {
          selectTurn = !selectTurn
        })
      $queqe.show('slide', {direction: 'up'}, 1000, null);
      $viewContainer.animate({'top': '60%'}, 1000, null)
      return
    }

    $(this).animate({ 'height': '3%' },
      1000, function () {
        selectTurn = !selectTurn
      })
    $queqe.hide('slide', {direction: 'up'}, 1000, null);
    $viewContainer.animate({'top': '50%'}, 1000, null)
  })

  $viewContainer.on('click', function () {
    if (viewTurn) {
      $profileContainer.hide(1000)
      $selectContainer.hide(1000)
      $focusDetails.show(1000)
      $(this).animate({
        'top': '35%',
        'left': '18%',
        'height': '300px',
        'width': '200px'
      }, 1000, null)
      $profileOnView.animate({
        'height': '190px',
        'width': '190px',
        'top': '33%',
        'left': '50%'
      }, 1000, null)
      $buttons.hide(200)
      viewTurn = !viewTurn
      return
    }

    function returnProfileOnView () {
      $profileOnView.animate({
        'height': '250px',
        'width': '250px',
        'top': '50%',
        'left': '35%'
      }, 1000, null)
      $buttons.show(1200)
    }

    $profileContainer.show(1000)
    $selectContainer.show(1000)
    $focusDetails.hide(1000)
    if (profileTurn && selectTurn) {
      $(this).animate({
        'top': '50%',
        'left': '50%',
        'height': '300px',
        'width': '400px'
      }, 1000, null)
      returnProfileOnView()
    } else if (!selectTurn && !profileTurn) {
      $viewContainer.animate({
        'top': '60%',
        'left': '65%',
        'height': '300px',
        'width': '400px'
      }, 1000, null)
      returnProfileOnView()
    } else if (!profileTurn) {
      $viewContainer.animate({
        'top': '50%',
        'left': '65%',
        'height': '300px',
        'width': '400px'
      }, 1000, null)
      returnProfileOnView()
    } else if (!selectTurn) {
      $viewContainer.animate({
        'top': '60%',
        'left': '50%',
        'height': '300px',
        'width': '400px'
      }, 1000, null)
      returnProfileOnView()
    }
    viewTurn = !viewTurn
  })

  $('#goProfile').on('click', function(e) {
    e.stopPropagation();
    if (profileViewTurn) {
      if (!matchesTurn) {
        $matchesView.hide('slide', {direction: 'up'}, 1000, null)
        matchesTurn = !matchesTurn
      }
      $profileView.show('slide', {direction: 'down'}, 1000, null)
      profileViewTurn = !profileViewTurn
      return
    }

    $profileView.hide('slide', {direction: 'up'}, 1000, null)
    profileViewTurn = !profileViewTurn
  })

  $('#goMatches').on('click', function(e) {
    e.stopPropagation();
    if (matchesTurn) {
      if (!profileViewTurn) {
        $profileView.hide('slide', {direction: 'up'}, 1000, null)
        profileViewTurn = !profileViewTurn
      }
      $matchesView.show('slide', {direction: 'down'}, 1000, null)
      matchesTurn = !matchesTurn
      return
    }
    $matchesView.hide('slide', {direction: 'up'}, 1000, null)
    matchesTurn = !matchesTurn
  })

})
