$('#myForm').submit((event) => {
  event.preventDefault();

  if ($('#newNum').val().trim()) {
    $('#error').hide();
  
    //check if prime number
    let isPrime = true;

    if ($('#newNum').val() < 0 || $('#newNum').val() == 0 || $('#newNum').val() == 1) {
      isPrime = false;
    }

    if ($('#newNum').val() > 1) {
      for (let i = 2; i < $('#newNum').val(); i++) {
        if ($('#newNum').val() % i == 0) {
          isPrime = false;
          break;
        }
      }
    }

    if (isPrime) {
      const li = `<li class='is-prime'> ${$('#newNum').val()} is a prime number</li>`;
      $('#attempts').append(li);
    } 
    if (!isPrime) {
      const li = `<li class='not-prime'> ${$('#newNum').val()} is NOT a prime number</li>`;
      $('#attempts').append(li);
    }

    $('#myForm').trigger('reset');
    $('#newNum').focus();
  }

  else {
    $('#error').show();
    $('#error').html('You must enter an input value');
    $('#newNum').focus();
    $('#newNum').value= "";
  }

});
