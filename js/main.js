/*
function templateMensajeGrupal(mensaje, tipo) {
  var clase = 'col-md-12';
  if (tipo === 'bubble-grupal') {
    clase = 'col-md-5';
  }
  return '<div class="col-md-12">' +
    '<div class="' + clase + '">' +
      '<div class="'+ tipo + '">' +
        '<h5>' + mensaje.persona + '</h5>' +
        '<h5>' + mensaje.texto + '</h5>' +
        '<h6>' + mensaje.hora + '</h6>' +
      '</div>' +
    '</div>' +
  '</div>';
};
*/

function templateMensaje(mensaje, tipo) {
  var clase = 'col-md-12';
  if (tipo === 'bubble') {
    clase = 'col-md-5';
  }
  return '<div class="col-md-12">' +
    '<div class="' + clase + '">' +
      '<div class="'+ tipo + '">' +
        '<h5>' + mensaje.texto + '</h5>' +
        '<h6>' + mensaje.hora + '</h6>' +
      '</div>' +
    '</div>' +
  '</div>';
};

function mostrar(item) {
  var id = $(item).parent().attr('id');
  $('.convo-section').html('');
  $.each(data, function(index, contacto) {
    if (index == id) {
      $.each(contacto.mensajes, function(index, mensaje) {
        var mensajeItem = templateMensaje(mensaje, 'bubble');
        $('.convo-section').append(mensajeItem);
      });
      $('.conversacion-chat').html('<div class="foto-perfil">'+
        '<img src="' + contacto.avatar + '"></div>' + 
        '<h4>' + contacto.nombre + '</h4>');
    }
  });
}

function templateContacto(contacto) {
  return '<li class="contact" id="' + contacto.id + '">' +
    '<a href="#" onclick="mostrar(this);">' +
      '<div class="foto-perfil">' +
        '<img src="' + contacto.avatar + '">' +
      '</div>' +
      '<h4>' + contacto.nombre +
      '<span class="profile-hora">' + contacto.hora + '</span></h4>' +
      '<h5>' + contacto.mensaje + '</h5>' +
    '</a>' +
  '</li>';
}

function llenarListaContactos() {
  var listaContactos = '';
  $.each(data, function(index, contacto) {
    contacto.id = index;
    listaContactos += templateContacto(contacto);
  });
  $('.contacts').html(listaContactos);
}

function obtenerHora() {
  var date = new Date();
  var hora = date.getHours();
  var minutos = date.getMinutes();

  if (minutos < 10) {
    minutos = '0' + minutos;
  }

  return hora + ':' + minutos;
}

$(document).on('ready', function() {

  llenarListaContactos();

  $('#mensajeNuevo').on('keypress', function(event) {
    if (event.keyCode === 13) {
      var textoMensaje = $('#mensajeNuevo').val();

      if (textoMensaje != '') {
        var mensaje = templateMensaje({
          texto : textoMensaje,
          hora : obtenerHora()
        }, 'mybubble');
        $('.convo-section').append(mensaje);
        $('#mensajeNuevo').val('');
      }
    }
  });

  $('#buscarChat').on('keyup', function(event) {
    var valorBuscado = $('#buscarChat').val();

    $.each(data, function(index, contacto) {
      if ((contacto.nombre).search(valorBuscado) !== -1) {
        var contactoItem = templateContacto(contacto);
        $('.contacts').html(contactoItem);
      }
    });

    if(event.keyCode === 8 && $(this).val() === '') {
      llenarListaContactos();
    }
  });
});
