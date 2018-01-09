$(document).ready(function () {
	var $grid = $('#interestGrid');
	
	$grid.masonry({
		itemSelector: '.interest-item',
		columnWidth: 22
	});

	var interestARR = [];

	var color = function () {
		let arr = ['#3F51B5', '#FFEB3B', '#8BC34A', '#9C27B0', '#F44336']
		return arr[Math.floor(Math.random() * arr.length)]
	}

  ! function renderToolBox () {
    let arr = ['Sports', 'Television', 'Exercise', 'Running',
      'Tennis', 'Bicycling', 'Swimming', 'Skiing', 'Golf',
      'Music', 'Traveling', 'Fishing', 'Hunting', 'Community Work', 'Church', 'Religion',
      'Painting', 'Drawing', 'Art', 'Computer', 'Animals', 'Reading', 'Dancing']

    for (var i = 0; i < arr.length; i++) {
      var text = $(`<span>${arr[i]}</span>`);
      var check = $(`<div>`).addClass('check').append(text).append(`<span class="glyphicon glyphicon-ok"></span>`);
      var box = $(`<div data-tool="${arr[i]}">`).addClass('interest-item')
										.css('background-color', color()).append(text).append(check);
      $grid.append(box)
      $grid.masonry('appended', box)
      blackAndYellow();
    }
  }()

  function blackAndYellow () {
    let boxes = $grid.children()
    boxes.each(function() {
      let color = $(this).css('background-color')
      if (color === 'rgb(255, 235, 59)') {
        let text = $(this).children().eq(0)
        text.css('color', 'black')
      }
    })
  }

  let count = 0;

  $('.interest-item').on('click', function () {
    let $marked = $(this).children().eq(1)
    if ($marked.css('display') === 'block') {
      $marked.toggle()
      $(this).data('data-selected', false)
      for (var i = 0; i < interestARR.length; i++) {
        if (interestARR[i] === $(this).attr('data-tool')) {
          interestARR.splice(i, 1)
        }
      }
      count--; nextValidator(); return
    }

    $(this).data('data-selected', true);
    $(this).children().eq(1).toggle();
    interestARR.push($(this).attr('data-tool'));
    count++; nextValidator();
  });

  function nextValidator () {
    let turn = false
    count > 4 ?
      ( $('#next').show('slide', {direction: 'down'}, 500, null),
      turn = true ) :
      ( $('#next').hide('slide', {direction: 'down'}, 500, null),
      turn = false )

    turn ?
    $('.interestContainer').animate({ 'left': '45%' }) :
    $('.interestContainer').animate({ 'left': '51%' })
  }

  $('#next').hide()
  $('#next').on('click', function () {
  	for (var i = 0; i < interestARR.length; i++) {
  		let data = {interest: interestARR[i]}
      $.ajax({
        url: '/interest-submit',
        type: 'POST',
        data: data,
        success: () => { console.log('success') }
      })
    }
    $('.interestContainer').hide()
    $('#next').hide()
    $('#surveyContainer').show()
  })

  $('#bioForm').on('submit', function (evt) {
    $('#bioForm').hide()
    $('#imageForm').show()
  })

	function inputChecker() {
      let checker = true;
      $('#bioForm > input').each(function () {
        if ($(this).val() === '') { checker = false }
      })
      return checker
	}

	function bioChecker() {
      let checker = true;
      let value = $('#bioForm > textarea').val();
      value.length === 0 ? checker = false : null;
      return checker;
    }

	function radioChecker() {
      let total = false;
      let checker1 = false;
      let checker2 = false;
      $("[name='looking']").each(function() {
        if ($(this).prop('checked')) { checker1 = true }
      });
      $("[name='sex']").each(function()  {
        if ($(this).prop('checked')) { checker2 = true }
      });
      if (checker1 & checker2) { total = true }
      return total
	}

	function submitShow() {
      radioChecker() && inputChecker() && bioChecker() ?
        $('#bioSubmit').show() :
        $('#bioSubmit').hide()
	}

  $('#surveyContainer').on("keyup", function () {
   	submitShow();
  })

  $('#surveyContainer').on("click", function () {
    submitShow();
  })

  $('#bioSubmit').on('click', function() {
  	$('#imgSubmit').show()
  })
})
