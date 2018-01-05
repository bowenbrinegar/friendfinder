$(document).ready(function () {
  const $loginContainer = $('.loginContainer')
  const $formContainer = $('#formContainer')
  const $registerButton = $('#registerButton')
  const $loginButton = $('#loginButton')

  const loginHtml =
    `<form id='loginHtml' action="/login" method="POST">
        <div class="form-group">
          <input type="email" class="form-control" name='email' id="loginEmail" placeholder='email' required>
        </div>
        <div class="form-group">
          <input type="password" class="form-control" name='password' id="loginPassword" placeholder='password' required>
        </div>
        <button type="submit" class="btnLR">Log In   &#8702;</button>
     </form>`

  const registerHtml =
    `<form id='registerHtml' action="/signup" method="post">
      <div class="form-group">
        <input type="text" class="form-control" name="name" placeholder='name' required />
        <input type="email" class="form-control" name="email" placeholder='email' required />
      </div>
      <div class="form-group">
        <input type="password" class="form-control" name="password" placeholder='password' required />
      </div>
      <div class="form-group">
        <input type="password" class="form-control" name="password-confirm" placeholder='password confirm' required />
      </div>
        <button type="submit" class="btnLR">Register   &#8702;</button>
    </form>`

  $loginButton.on('click', function () {
    loginRender()
  })

  $registerButton.on('click', function () {
    registerRender()
  })

  function registerRender () {
    $formContainer.empty()
    $formContainer.append(registerHtml)
    $registerButton.css({'background': 'rgb(247, 116, 39)', 'color': 'white'})
    $loginButton.css({'background': 'rgb(84, 237, 211)'})
    $loginContainer.animate({'height': '300px'}, 1000, null)
    $loginButton.hover(function () {
      $(this).addClass('hover')
    }, function () {
      $(this).removeClass('hover')
    })
    $registerButton.off('mouseenter mouseleave')
    $registerButton.removeClass('hover')
  }

  registerRender()

  function loginRender () {
    $formContainer.empty()
    $formContainer.append(loginHtml)
    $registerButton.css({'background': 'rgb(84, 237, 211)'})
    $loginButton.css({'background': 'rgb(247, 116, 39)', 'color': 'white'})
    $loginContainer.animate({'height': '200px'}, 1000, null)
    $registerButton.hover(function () {
      $(this).addClass('hover')
    }, function () {
      $(this).removeClass('hover')
    })
    $loginButton.off('mouseenter mouseleave')
    $loginButton.removeClass('hover')
  }
})
