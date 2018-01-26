$(document).ready(() => {


$('.profileOnView').on('click', 'img', function() {
  let id = $(this).attr('data-id')
  fetchProfile(id)
});

const fetchProfile = (id) => {
  $.ajax({
    type: 'GET',
    url: '/get-onView-profile/' + id,
    success: distribute
  })
}

const distribute = (res) => {
  console.log(res)
}

})