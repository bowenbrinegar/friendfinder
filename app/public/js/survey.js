$(document).ready(function () {
	var $grid = $('#interestGrid');


	$grid.masonry({
		itemSelector: '.interest-item',
		columnWidth: 22
	});

	var interestARR = [];

	var color = function () {
		let arr = ['DarkMagenta', 'DeepSkyBlue', 'DarkGrey', 'DarkGoldenRod',
			'DarkSalmon', 'SpringGreen', 'FireBrick', 'Orchid', 'BlueViolet',
			'Indigo', 'DarkViolet', 'Sienna', 'DarkCyan', 'Fuchsia', 'SeaGreen',
			'SaddleBrown', 'DarkTurquoise', 'Green', 'MidnightBlue']
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
										.css('background', color()).append(text).append(check);
      $grid.append(box)
      $grid.masonry('appended', box)
    }
  }()

  $('.interest-item').on('click', function () {
    if ($(this).children().eq(1).css('display') == 'block') {
      $(this).children().eq(1).toggle()
      $(this).data('data-selected', false)
      for (var i = 0; i < interestARR.length; i++) {
        if (interestARR[i] === $(this).attr('data-tool')) {
          interestARR.splice(i, 1)
        }
      }
      nextValidator();
      return
    }

    $(this).data('data-selected', true);
    $(this).children().eq(1).toggle();
    interestARR.push($(this).attr('data-tool'));
    nextValidator()
  });

  function nextValidator () {
    let count = 0;
    let temp = $grid.children();
    let turn = false;
    for (var i = 0; i < temp.length; i++) {
      if (temp.eq([i]).data().dataSelected) {
        count++
        if (count > 4) {
          $('#next').show('slide', {direction: 'down'}, 500, null)
          turn = true
        } else {
          $('#next').hide('slide', {direction: 'down'}, 500, null)
          turn = false
        }
      }
    }
    if (turn) {
      $('.interestContainer').animate({
        'left': '45%'
      })
    } else {
      $('.interestContainer').animate({
        'left': '51%'
      })
    }
  }

  $('#next').hide()
  $('#next').on('click', function () {
  	for (var i = 0; i < interestARR.length; i++) {
  		let data = {interest: interestARR[i]}
      $.ajax({
        url: '/interest-submit',
        type: 'POST',
        data: data
      }).done(function (data) {
        console.log('success')
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
          if ($(this).val() == '') {
              checker = false
          };
      })
      return checker
	}

	function radioChecker() {
      let total = false;
      let checker1 = false;
      $("[name='looking']").each(function() {
          if ($(this).prop('checked')) {
              checker1 = true
          }
      });
      let checker2 = false;
      $("[name='sex']").each(function()  {
          if ($(this).prop('checked')) {
              checker2 = true;
          }

      });
      if (checker1 & checker2) {
          total = true
      }
      return total
	}

	function submitShow() {
      if (radioChecker() && inputChecker())  {
          $('#bioSubmit').show()
      } else {
          $('#bioSubmit').hide()
      }
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
