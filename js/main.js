(function () {
  function logElementEvent(eventName, element) {
    console.log(Date.now(), eventName, element.getAttribute("data-src"));
  }

  var callback_enter = function (element) {
    logElementEvent("🔑 ENTERED", element);
  };
  var callback_exit = function (element) {
    logElementEvent("🚪 EXITED", element);
  };
  var callback_loading = function (element) {
    logElementEvent("⌚ LOADING", element);
  };
  var callback_loaded = function (element) {
    logElementEvent("👍 LOADED", element);
  };
  var callback_error = function (element) {
    logElementEvent("💀 ERROR", element);
  };
  var callback_finish = function () {
    logElementEvent("✔️ FINISHED", document.documentElement);
  };
  var callback_cancel = function (element) {
    logElementEvent("🔥 CANCEL", element);
  };

  var ll = new LazyLoad({
    unobserve_entered: true, // <- Avoid executing the function multiple times
    class_applied: "lz-applied",
    class_loading: "lz-loading",
    class_loaded: "lz-loaded",
    class_error: "lz-error",
    class_entered: "lz-entered",
    class_exited: "lz-exited",
    // Assign the callbacks defined above
    callback_enter: callback_enter,
    callback_exit: callback_exit,
    callback_cancel: callback_cancel,
    callback_loading: callback_loading,
    callback_loaded: callback_loaded,
    callback_error: callback_error,
    callback_finish: callback_finish,
  });
})();

$(".hamburger").click(function () {
  $(".header").toggleClass("active");
  $(".header").addClass("show");

  return false;
});

// переход по клику на объектах go_to
$(document).on("click", ".go_to", function () {
  var scroll_el = $(this).attr("data-go");
  var header_heigth = $(".header").outerHeight();
  $(".header").removeClass("show");

  if ($(scroll_el).length != 0) {
    $("html, body").animate(
      { scrollTop: $(scroll_el).offset().top - header_heigth },
      500
    );
  }

  setTimeout(() => $(".header").addClass("show"), 550);
  setTimeout(() => $(".header").addClass("show"), 650);

  return false;
});

// переход по клику на объектах menu_go_to
$(document).on("click", ".menu_go_to", function () {
  var scroll_el = $(this).attr("data-go");
  var header_heigth = 82;

  $(".header").toggleClass("active");
  $(".header").removeClass("show");

  if ($(scroll_el).length != 0) {
    $("html, body").animate(
      { scrollTop: $(scroll_el).offset().top - header_heigth },
      500
    );
  }

  setTimeout(() => $(".header").addClass("show"), 550);
  setTimeout(() => $(".header").addClass("show"), 650);

  return false;
});

// открытие ссылок
function go_to_link(url) {
  window.open("https://" + url);
}

// переключение контента с описанием частей курса
$(document).on("click", ".media-selector", function () {
  var index = $(this).attr("select-index");
  var chapter_item = $(this).closest(".chapters-left-side");
  var objects = $(chapter_item).find(".media-content");

  for (var i = 0; i < objects.length; i++) {
    if (i == index - 1) {
      objects[i].classList.add("active");
      $(objects[i]).parent().css("height", objects[i].scrollHeight);
    } else {
      objects[i].classList.remove("active");
    }
  }
});

// окончание проигрывания любого видео
$("video").on("ended", function () {
  this.currentTime = 0;
  this.src = this.src;
});

// Изменение статуса выделения пункта в аккордеоне
function set_active_item(index) {
  var objects = document.getElementsByClassName("faq_item");
  var objects_2 = document.getElementsByClassName("faq_item_body_text");

  for (var i = 0; i < objects.length; i++) {
    if (i == index && !objects[i].classList.contains("faq_item_active")) {
      objects[i].classList.add("faq_item_active");
      objects[i].style.paddingBottom = `30px`;
      objects_2[i].style.maxHeight = `${objects_2[i].scrollHeight}px`;
    } else {
      objects[i].classList.remove("faq_item_active");
      objects[i].style.paddingBottom = `20px`;
      objects_2[i].style.maxHeight = `0px`;
    }
  }
}

/* Player */

function video_modal(hash) {
  $("#yt_player").append(
    '<iframe class="video_yt_player" width="100%" height="100%" src="https://www.youtube.com/embed/' +
      hash +
      '?enablejsapi=1&amp;autoplay=1&amp;start=0&amp;autohide=1&amp;wmode=opaque&amp;showinfo=0&amp;origin=https://easymetry.com&amp;rel=0&amp;iv_load_policy=3" frameborder="0" allowfullscreen="" allow="autoplay; encrypted-media"></iframe>'
  );
  open_modal("#modal_video");
}

/* Player */

// Анимация хедера
$(document).ready(function () {
  // Запоминаем стартовое положение странички
  let prevScrollpos = window.pageYOffset;

  // Запрещаем прятать хедер
  var canHide = false;

  // Показываем хедер
  setTimeout(() => $(".header").addClass("show"), 250);
  setTimeout(() => $(".header").addClass("show"), 500);
  setTimeout(() => $(".header").addClass("show"), 750);
  setTimeout(() => $(".header").addClass("show"), 1000);

  $(window).scroll(function (event) {
    /* !!! появление/исчезновение при скролле !!! */

    // Положение странички при скролле
    lastScrollpos = window.pageYOffset;
    // Положение второго блока
    //minScrollPos = $('.trailer').offset().top - 82;
    minScrollPos = 100;

    // Если не дошли до второго блока, постоянно показываем хедер
    if (lastScrollpos < minScrollPos) {
      canHide = false;
    } else {
      canHide = true;
    }

    // Добавляем границу после первого блока
    const addBorder = 600;
    if (lastScrollpos < addBorder) {
      $(".header").removeClass("border");
    } else {
      $(".header").addClass("border");
    }

    // Действие при прокрутке вниз
    if (lastScrollpos > prevScrollpos && canHide) {
      // Прячем хедер
      $(".header").removeClass("show");

      // Действие при прокрутке вверх
    } else {
      // Показываем хедер
      $(".header").addClass("show");
    }

    // Запоминаем текущее положение странички после скролла
    // С задержкой в 0.5с для исключения микроскроллов
    setTimeout(() => (prevScrollpos = lastScrollpos), 500);

    /* !!! подсветка активного пункта !!! */

    // определяем позиции разделов
    var about = $(".trailer-header").offset().top;
    var training_programm = $(".chapters").offset().top; // to_do изменить на раздел с блоками
    var students = $(".examples-header").offset().top;
    var testimonials = $(".testimonials").offset().top;
    var payment = $(".pp_base").offset().top;
    var faq = $(".faq_base").offset().top;

    // определяем текущую позицию скролла без учёта высоты хедера
    var header_heigth = 82;
    var currentScrollPos = window.pageYOffset + header_heigth + 1;

    // определяем в каком разделе находимся и подсвечиваем нужный элемент

    if (currentScrollPos < about) {
      $(".m-about").removeClass("active");
      $(".m-training-programm").removeClass("active");
      $(".m-students").removeClass("active");
      $(".m-testimonials").removeClass("active");
      $(".m-faq").removeClass("active");
    }

    if (about < currentScrollPos && currentScrollPos < training_programm) {
      $(".m-about").addClass("active");
      $(".m-training-programm").removeClass("active");
      $(".m-students").removeClass("active");
      $(".m-testimonials").removeClass("active");
      $(".m-faq").removeClass("active");
    }

    if (training_programm < currentScrollPos && currentScrollPos < students) {
      $(".m-about").removeClass("active");
      $(".m-training-programm").addClass("active");
      $(".m-students").removeClass("active");
      $(".m-testimonials").removeClass("active");
      $(".m-faq").removeClass("active");
    }

    if (students < currentScrollPos && currentScrollPos < testimonials) {
      $(".m-about").removeClass("active");
      $(".m-training-programm").removeClass("active");
      $(".m-students").addClass("active");
      $(".m-testimonials").removeClass("active");
      $(".m-faq").removeClass("active");
    }

    if (testimonials < currentScrollPos && currentScrollPos < payment) {
      $(".m-about").removeClass("active");
      $(".m-training-programm").removeClass("active");
      $(".m-students").removeClass("active");
      $(".m-testimonials").addClass("active");
      $(".m-faq").removeClass("active");
    }

    if (payment < currentScrollPos && currentScrollPos < faq) {
      $(".m-about").removeClass("active");
      $(".m-training-programm").removeClass("active");
      $(".m-students").removeClass("active");
      $(".m-testimonials").removeClass("active");
      $(".m-faq").removeClass("active");
    }

    if (faq < currentScrollPos) {
      $(".m-about").removeClass("active");
      $(".m-training-programm").removeClass("active");
      $(".m-students").removeClass("active");
      $(".m-testimonials").removeClass("active");
      $(".m-faq").addClass("active");
    }
  });
});

/* Константы для блока оплаты */

const BBC_parts_count = 5;
const MC_parts_count = 2;

let BBC_Full_price = [];
let BBC_Inst_price = [];

BBC_Full_price[1] = 9900;
BBC_Full_price[2] = 9900;
BBC_Full_price[3] = 9900;
BBC_Full_price[4] = 11900;
BBC_Full_price[5] = 15900;

BBC_Inst_price[1] = 11900;
BBC_Inst_price[2] = 11900;
BBC_Inst_price[3] = 11900;
BBC_Inst_price[4] = 14900;
BBC_Inst_price[5] = 17900;

let MC_Full_price = [];
let MC_Inst_price = [];

MC_Full_price[1] = 9900;
MC_Full_price[2] = 9900;

MC_Inst_price[1] = 11900;
MC_Inst_price[2] = 11900;

// Изменение статуса выделения блока оплаты
function blockchange(course, part) {
  var clickedEl = document.getElementById("bl_" + course + "_" + part);

  clickedEl.classList.toggle("unchecked_block");
  clickedEl.classList.toggle("checked_block");
  calc_totals();
}

// Пересчет общих сумм
function calc_totals() {
  var El_Full_price = document.getElementById("bl_full_price_text_li");
  var El_Inst_price = document.getElementById("bl_installment_price_text_li");
  var El_Inst_info = document.getElementById("bl_installment_info_text_li");
  var Full_total_price = 0;
  var Inst_total_price = 0;
  var str = "";

  for (var i = 1; i < BBC_parts_count + 1; i++) {
    if (
      document
        .getElementById("bl_BBC_Part_" + i)
        .classList.contains("checked_block")
    ) {
      Full_total_price = Full_total_price + BBC_Full_price[i];
      Inst_total_price = Inst_total_price + BBC_Inst_price[i];
    }
  }

  for (var i = 1; i < MC_parts_count + 1; i++) {
    if (
      document
        .getElementById("bl_MC_Part_" + i)
        .classList.contains("checked_block")
    ) {
      Full_total_price = Full_total_price + MC_Full_price[i];
      Inst_total_price = Inst_total_price + MC_Inst_price[i];
    }
  }

  El_Inst_info.innerHTML =
    `Итоговая сумма — ` +
    Inst_total_price.toLocaleString() +
    ` ₽ с&nbspучётом банковской комиссии`;

  str = Full_total_price.toLocaleString() + ` ₽`;
  El_Full_price.innerHTML = str.replace(/ /g, "&nbsp");

  str = (Math.ceil(Inst_total_price / 12 / 10) * 10).toLocaleString() + ` ₽`;
  El_Inst_price.innerHTML = str.replace(/ /g, "&nbsp");

  if (document.getElementById("rb1").checked) {
    str = Full_total_price.toLocaleString() + ` ₽`;
  } else if (document.getElementById("rb2").checked) {
    str = Inst_total_price.toLocaleString() + ` ₽`;
  }
}

// Изменение типа оплаты

function paychange(type) {
  var El_BBC_1_price = document.getElementById("bl_BBC_Part_1_price");
  var El_BBC_2_price = document.getElementById("bl_BBC_Part_2_price");
  var El_BBC_3_price = document.getElementById("bl_BBC_Part_3_price");
  var El_BBC_4_price = document.getElementById("bl_BBC_Part_4_price");
  var El_BBC_5_price = document.getElementById("bl_BBC_Part_5_price");

  var El_MC_1_price = document.getElementById("bl_MC_Part_1_price");
  var El_MC_2_price = document.getElementById("bl_MC_Part_2_price");

  var El_Choicer_Full = document.getElementById("ch_Full");
  var El_Choicer_Inst = document.getElementById("ch_Inst");
  var El_Hidden_Installment_info = document.getElementById(
    "bl_installment_info_text"
  );
  var El_Hidden_Input_city = document.getElementById("ib_city");
  var El_Payment_text = document.getElementById("bl_payment_text");
  var El_Agreement_text = document.getElementById("bl_agreement_text");
  var El_Button_text = document.getElementById("bl_button_text");

  if (type == "Full") {
    El_Hidden_Installment_info.classList.add("hidden");
    El_Hidden_Input_city.classList.add("hidden");
    El_Choicer_Full.classList.add("active_choicer");
    El_Choicer_Inst.classList.remove("active_choicer");

    El_BBC_1_price.innerHTML = BBC_Full_price[1].toLocaleString() + `&nbsp₽`;
    El_BBC_2_price.innerHTML = BBC_Full_price[2].toLocaleString() + `&nbsp₽`;
    El_BBC_3_price.innerHTML = BBC_Full_price[3].toLocaleString() + `&nbsp₽`;
    El_BBC_4_price.innerHTML = BBC_Full_price[4].toLocaleString() + `&nbsp₽`;
    El_BBC_5_price.innerHTML = BBC_Full_price[5].toLocaleString() + `&nbsp₽`;

    El_MC_1_price.innerHTML = MC_Full_price[1].toLocaleString() + `&nbsp₽`;
    El_MC_2_price.innerHTML = MC_Full_price[2].toLocaleString() + `&nbsp₽`;

    El_Payment_text.innerHTML =
      'Прежде чем перейти к&nbsp;оплате, подтвердите ознакомление с&nbsp;документами:';
    El_Agreement_text.innerHTML =
      'Нажимая на&nbspкнопку «Перейти&nbsp;к&nbsp;оплате», вы&nbsp;подтверждаете что&nbsp;вам есть 18&nbsp;лет';
    El_Button_text.innerHTML = "Перейти к оплате";
  } else if (type == "Installment") {
    El_Hidden_Installment_info.classList.remove("hidden");
    El_Hidden_Input_city.classList.remove("hidden");
    El_Choicer_Full.classList.remove("active_choicer");
    El_Choicer_Inst.classList.add("active_choicer");

    El_BBC_1_price.innerHTML = BBC_Inst_price[1].toLocaleString() + `&nbsp₽`;
    El_BBC_2_price.innerHTML = BBC_Inst_price[2].toLocaleString() + `&nbsp₽`;
    El_BBC_3_price.innerHTML = BBC_Inst_price[3].toLocaleString() + `&nbsp₽`;
    El_BBC_4_price.innerHTML = BBC_Inst_price[4].toLocaleString() + `&nbsp₽`;
    El_BBC_5_price.innerHTML = BBC_Inst_price[5].toLocaleString() + `&nbsp₽`;

    El_MC_1_price.innerHTML = MC_Inst_price[1].toLocaleString() + `&nbsp₽`;
    El_MC_2_price.innerHTML = MC_Inst_price[2].toLocaleString() + `&nbsp₽`;

    El_Payment_text.innerHTML =
      'Прежде чем оформить заказ, подтвердите ознакомление с&nbsp;документами:';
    El_Agreement_text.innerHTML =
      'Нажимая на&nbsp;кнопку «Оформить&nbsp;заказ», вы&nbsp;подтверждаете что&nbsp;вам есть 18&nbsp;лет';
    El_Button_text.innerHTML = "Оформить заказ";
  }
}


// Изменение типа оплаты при клике на объект
function click_label(type) {
  if (type == "Full") {
    document.getElementById("rb1").checked = "checked";
    paychange("Full");
  } else if (type == "Installment") {
    document.getElementById("rb2").checked = "checked";
    paychange("Installment");
  }
}

// Изменение чекбоксов в соглашениях
$(document).on("click", ".pp_rs_pay_checkbox", function ()  {
  $(this).toggleClass("active");
});

// обнуление всех чекбоксов
function cb_refresh() {
  document.getElementById("rb1").checked = true;
  document.getElementById("rb2").checked = false;

  var El_Checkboxes = document.querySelectorAll(".pp_ls_block");

  for (var i = 0; i < El_Checkboxes.length; i++) {
    El_Checkboxes[i].classList.remove("checked_block");
    El_Checkboxes[i].classList.add("unchecked_block");
  }

  document.getElementById("rb1").checked = true;
  document.getElementById("rb2").checked = false;

  document.getElementById("bl_BBC_Part_1").classList.add("checked_block");
  document.getElementById("bl_BBC_Part_1").classList.remove("unchecked_block");

  document.getElementById("bl_BBC_Part_2").classList.add("checked_block");
  document.getElementById("bl_BBC_Part_2").classList.remove("unchecked_block");

  document.getElementById("bl_BBC_Part_3").classList.add("checked_block");
  document.getElementById("bl_BBC_Part_3").classList.remove("unchecked_block");

  document.getElementById("bl_BBC_Part_4").classList.remove("checked_block");
  document.getElementById("bl_BBC_Part_4").classList.add("unchecked_block");

  document.getElementById("bl_BBC_Part_5").classList.remove("checked_block");
  document.getElementById("bl_BBC_Part_5").classList.add("unchecked_block");

  document.getElementById("bl_MC_Part_1").classList.remove("checked_block");
  document.getElementById("bl_MC_Part_1").classList.add("unchecked_block");

  document.getElementById("bl_MC_Part_2").classList.remove("checked_block");
  document.getElementById("bl_MC_Part_2").classList.add("unchecked_block");

  calc_totals();
}

// отправка данных пользователя в геткурс

function submit() {
  var acc_pers_data = $("#Acc_Pers_Data");
  var acc_offerta = $("#Acc_Offerta");
  
  if (
    ! (acc_pers_data.hasClass("active") 
    && acc_offerta.hasClass("active"))
  ) {
    popup_open(".popup-warning");
    return;
    }

  var user = {
    name: "",
    phone: "",
    mail: "",
    city: "",
  };
  var payment_type = "";
  var BBC_products = 0;
  var MC_products = 0;
  var regexp = / /;
  var utm_data = "";
  var link = "";
  user.name = document.getElementById("inp_name").value;
  user.phone = document.getElementById("inp_phone").value;
  user.mail = document.getElementById("inp_mail").value;
  user.city = document.getElementById("inp_city").value;

  if (document.getElementById("ch_Full").classList.contains("active_choicer")) {
    payment_type = "Full";
  } else if (
    document.getElementById("ch_Inst").classList.contains("active_choicer")
  ) {
    payment_type = "Inst";
  } else {
    payment_type = "";
  }

  for (var i = 1; i < BBC_parts_count + 1; i++) {
    if (
      document
        .getElementById("bl_BBC_Part_" + i)
        .classList.contains("checked_block")
    ) {
      BBC_products = BBC_products + Math.pow(2, i - 1);
    }
  }

  for (var i = 1; i < MC_parts_count + 1; i++) {
    if (
      document
        .getElementById("bl_MC_Part_" + i)
        .classList.contains("checked_block")
    ) {
      MC_products = MC_products + Math.pow(2, i - 1);
    }
  }

  regexp = /^[A-Za-zА-Яа-яЁё .,_~*{}()[\]+-]+$/;
  user.name = regexp.exec(user.name);
  regexp = /^\(?\+?[0-9 ()+-]*[0-9]$/;
  user.phone = regexp.exec(user.phone);
  regexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  user.mail = regexp.exec(user.mail);

  if (
    user.name == undefined ||
    user.phone == undefined ||
    user.mail == undefined
  ) {
    alert("Проверьте правильность заполнения полей");
    return;
  }

  if (payment_type == "Inst") {
    regexp = /^[A-Za-zА-Яа-яЁё .,_~*{}()[\]+-]+$/;
    user.city = regexp.exec(user.city);

    if (user.city == undefined) {
      alert("Проверьте правильность заполнения полей");
      return;
    }
  }

  if ((BBC_products || MC_products) == 0) {
    alert("Выберите блоки для покупки");
    return;
  }

  if (window.location.search.length > 0) {
    utm_data = window.location.search.replace(/^[?]/, "");
  }

  link =
    "http://service.bestblendercourse.com/paymentblock2.php?payment_type=" +
    payment_type +
    "&BBC_products=" +
    BBC_products +
    "&MC_products=" +
    MC_products +
    "&name=" +
    user.name +
    "&phone=" +
    user.phone +
    "&mail=" +
    user.mail;

  if (payment_type == "Inst") {
    link = link + "&city=" + user.city;
  }

  if (utm_data.length > 0) {
    link = link + "&" + utm_data;
  }

  location.href = link;
}


// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// изменяет или добавляет новые куки
// с указанным name и значением value
// в options указываются доп. параметры 
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // значения по умолчанию (можно добавить)
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// удаляет куки с параметром name
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}

// нажатие на подтверждение согласия на размещение куки
function cookie_accept () {
  setCookie ('cookie_acc', 'ok', {'max-age': 31536000})
  $(".popup-cookie").addClass("popup-hidden");
  $(".popup-cookie").removeClass("popup-visible");
}

// открытие попапов с селектором ind
function popup_open(ind) {

	$(ind).removeClass('popup-hidden');
	$('body').addClass('scroll-lock');
}

// закрытие попапов с селектором ind
function popup_close(ind) {

	$(ind).addClass('popup-hidden');
	$('body').removeClass('scroll-lock');
}

document.addEventListener("DOMContentLoaded", function (e) {
  
  // инициализация стартового набора блоков для покупки
  cb_refresh();

  // отображение уведомления о cookie
  var acc = getCookie('cookie_acc');
  
  if (acc !== 'ok') {
    $(".popup-cookie").removeClass("popup-hidden");
    $(".popup-cookie").addClass("popup-visible");
  }

});

// блок с информацией о курсе
$(".teachers-carousel").flickity({
  // options, defaults listed

  accessibility: true,
  // enable keyboard navigation, pressing left & right keys

  adaptiveHeight: false,
  // set carousel height to the selected slide

  autoPlay: false,
  // advances to the next cell
  // if true, default is 3 seconds
  // or set time between advances in milliseconds
  // i.e. `autoPlay: 1000` will advance every 1 second

  cellAlign: "left",
  // alignment of cells, 'center', 'left', or 'right'
  // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)

  cellSelector: undefined,
  // specify selector for cell elements

  contain: true,
  // will contain cells to container
  // so no excess scroll at beginning or end
  // has no effect if wrapAround is enabled

  draggable: ">1",
  // enables dragging & flicking
  // if at least 2 cells

  dragThreshold: 10,
  // number of pixels a user must scroll horizontally to start dragging
  // increase to allow more room for vertical scroll for touch devices

  freeScroll: false,
  // enables content to be freely scrolled and flicked
  // without aligning cells

  friction: 0.5,
  // smaller number = easier to flick farther

  groupCells: false,
  // group cells together in slides

  initialIndex: 0,
  // zero-based index of the initial selected cell

  lazyLoad: true,
  // enable lazy-loading images
  // set img data-flickity-lazyload="src.jpg"
  // set to number to load images adjacent cells

  percentPosition: true,
  // sets positioning in percent values, rather than pixels
  // Enable if items have percent widths
  // Disable if items have pixel widths, like images

  prevNextButtons: false,
  // creates and enables buttons to click to previous & next cells

  pageDots: true,
  // create and enable page dots

  resize: true,
  // listens to window resize events to adjust size & positions

  rightToLeft: false,
  // enables right-to-left layout

  setGallerySize: true,
  // sets the height of gallery
  // disable if gallery already has height set with CSS

  watchCSS: false,
  // watches the content of :after of the element
  // activates if #element:after { content: 'flickity' }

  wrapAround: false,
  // at end of cells, wraps-around to first for infinite scrolling
});

// подключение скроллера flickity

// блок с информацией о курсе
$(".information-carousel").flickity({
  // options, defaults listed

  accessibility: true,
  // enable keyboard navigation, pressing left & right keys

  adaptiveHeight: false,
  // set carousel height to the selected slide

  autoPlay: false,
  // advances to the next cell
  // if true, default is 3 seconds
  // or set time between advances in milliseconds
  // i.e. `autoPlay: 1000` will advance every 1 second

  cellAlign: "left",
  // alignment of cells, 'center', 'left', or 'right'
  // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)

  cellSelector: undefined,
  // specify selector for cell elements

  contain: true,
  // will contain cells to container
  // so no excess scroll at beginning or end
  // has no effect if wrapAround is enabled

  draggable: ">1",
  // enables dragging & flicking
  // if at least 2 cells

  dragThreshold: 10,
  // number of pixels a user must scroll horizontally to start dragging
  // increase to allow more room for vertical scroll for touch devices

  freeScroll: false,
  // enables content to be freely scrolled and flicked
  // without aligning cells

  friction: 0.5,
  // smaller number = easier to flick farther

  groupCells: false,
  // group cells together in slides

  initialIndex: 0,
  // zero-based index of the initial selected cell

  lazyLoad: true,
  // enable lazy-loading images
  // set img data-flickity-lazyload="src.jpg"
  // set to number to load images adjacent cells

  percentPosition: true,
  // sets positioning in percent values, rather than pixels
  // Enable if items have percent widths
  // Disable if items have pixel widths, like images

  prevNextButtons: true,
  // creates and enables buttons to click to previous & next cells

  pageDots: true,
  // create and enable page dots

  resize: true,
  // listens to window resize events to adjust size & positions

  rightToLeft: false,
  // enables right-to-left layout

  setGallerySize: true,
  // sets the height of gallery
  // disable if gallery already has height set with CSS

  watchCSS: false,
  // watches the content of :after of the element
  // activates if #element:after { content: 'flickity' }

  wrapAround: false,
  // at end of cells, wraps-around to first for infinite scrolling
});

// блоки в описании частей
$(".chapters-mobile-carousel").flickity({
  // options, defaults listed

  accessibility: true,
  // enable keyboard navigation, pressing left & right keys

  adaptiveHeight: false,
  // set carousel height to the selected slide

  autoPlay: false,
  // advances to the next cell
  // if true, default is 3 seconds
  // or set time between advances in milliseconds
  // i.e. `autoPlay: 1000` will advance every 1 second

  cellAlign: "left",
  // alignment of cells, 'center', 'left', or 'right'
  // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)

  cellSelector: undefined,
  // specify selector for cell elements

  contain: true,
  // will contain cells to container
  // so no excess scroll at beginning or end
  // has no effect if wrapAround is enabled

  draggable: ">1",
  // enables dragging & flicking
  // if at least 2 cells

  dragThreshold: 10,
  // number of pixels a user must scroll horizontally to start dragging
  // increase to allow more room for vertical scroll for touch devices

  freeScroll: false,
  // enables content to be freely scrolled and flicked
  // without aligning cells

  friction: 0.5,
  // smaller number = easier to flick farther

  groupCells: false,
  // group cells together in slides

  initialIndex: 1,
  // zero-based index of the initial selected cell

  lazyLoad: true,
  // enable lazy-loading images
  // set img data-flickity-lazyload="src.jpg"
  // set to number to load images adjacent cells

  percentPosition: true,
  // sets positioning in percent values, rather than pixels
  // Enable if items have percent widths
  // Disable if items have pixel widths, like images

  prevNextButtons: false,
  // creates and enables buttons to click to previous & next cells

  pageDots: false,
  // create and enable page dots

  resize: true,
  // listens to window resize events to adjust size & positions

  rightToLeft: false,
  // enables right-to-left layout

  setGallerySize: true,
  // sets the height of gallery
  // disable if gallery already has height set with CSS

  watchCSS: false,
  // watches the content of :after of the element
  // activates if #element:after { content: 'flickity' }

  wrapAround: false,
  // at end of cells, wraps-around to first for infinite scrolling
});

// блок примеров работ
$(".examples-carousel").flickity({
  // options, defaults listed

  accessibility: true,
  // enable keyboard navigation, pressing left & right keys

  adaptiveHeight: false,
  // set carousel height to the selected slide

  autoPlay: false,
  // advances to the next cell
  // if true, default is 3 seconds
  // or set time between advances in milliseconds
  // i.e. `autoPlay: 1000` will advance every 1 second

  cellAlign: "left",
  // alignment of cells, 'center', 'left', or 'right'
  // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)

  cellSelector: undefined,
  // specify selector for cell elements

  contain: true,
  // will contain cells to container
  // so no excess scroll at beginning or end
  // has no effect if wrapAround is enabled

  draggable: ">1",
  // enables dragging & flicking
  // if at least 2 cells

  dragThreshold: 10,
  // number of pixels a user must scroll horizontally to start dragging
  // increase to allow more room for vertical scroll for touch devices

  freeScroll: false,
  // enables content to be freely scrolled and flicked
  // without aligning cells

  friction: 0.5,
  // smaller number = easier to flick farther

  groupCells: false,
  // group cells together in slides

  initialIndex: 1,
  // zero-based index of the initial selected cell

  lazyLoad: true,
  // enable lazy-loading images
  // set img data-flickity-lazyload="src.jpg"
  // set to number to load images adjacent cells

  percentPosition: true,
  // sets positioning in percent values, rather than pixels
  // Enable if items have percent widths
  // Disable if items have pixel widths, like images

  prevNextButtons: true,
  // creates and enables buttons to click to previous & next cells

  pageDots: true,
  // create and enable page dots

  resize: true,
  // listens to window resize events to adjust size & positions

  rightToLeft: false,
  // enables right-to-left layout

  setGallerySize: true,
  // sets the height of gallery
  // disable if gallery already has height set with CSS

  watchCSS: false,
  // watches the content of :after of the element
  // activates if #element:after { content: 'flickity' }

  wrapAround: false,
  // at end of cells, wraps-around to first for infinite scrolling
});

// блок отзывов
$(".testimonials-carousel").flickity({
  // options, defaults listed

  accessibility: true,
  // enable keyboard navigation, pressing left & right keys

  adaptiveHeight: false,
  // set carousel height to the selected slide

  autoPlay: false,
  // advances to the next cell
  // if true, default is 3 seconds
  // or set time between advances in milliseconds
  // i.e. `autoPlay: 1000` will advance every 1 second

  cellAlign: "left",
  // alignment of cells, 'center', 'left', or 'right'
  // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)

  cellSelector: undefined,
  // specify selector for cell elements

  contain: true,
  // will contain cells to container
  // so no excess scroll at beginning or end
  // has no effect if wrapAround is enabled

  draggable: ">1",
  // enables dragging & flicking
  // if at least 2 cells

  dragThreshold: 10,
  // number of pixels a user must scroll horizontally to start dragging
  // increase to allow more room for vertical scroll for touch devices

  freeScroll: false,
  // enables content to be freely scrolled and flicked
  // without aligning cells

  friction: 0.5,
  // smaller number = easier to flick farther

  groupCells: false,
  // group cells together in slides

  initialIndex: 1,
  // zero-based index of the initial selected cell

  lazyLoad: true,
  // enable lazy-loading images
  // set img data-flickity-lazyload="src.jpg"
  // set to number to load images adjacent cells

  percentPosition: true,
  // sets positioning in percent values, rather than pixels
  // Enable if items have percent widths
  // Disable if items have pixel widths, like images

  prevNextButtons: true,
  // creates and enables buttons to click to previous & next cells

  pageDots: true,
  // create and enable page dots

  resize: true,
  // listens to window resize events to adjust size & positions

  rightToLeft: false,
  // enables right-to-left layout

  setGallerySize: true,
  // sets the height of gallery
  // disable if gallery already has height set with CSS

  watchCSS: false,
  // watches the content of :after of the element
  // activates if #element:after { content: 'flickity' }

  wrapAround: false,
  // at end of cells, wraps-around to first for infinite scrolling
});

// блок логотипов компаний
$(".student-work-carousel").flickity({
  // options, defaults listed

  accessibility: true,
  // enable keyboard navigation, pressing left & right keys

  adaptiveHeight: false,
  // set carousel height to the selected slide

  autoPlay: false,
  // advances to the next cell
  // if true, default is 3 seconds
  // or set time between advances in milliseconds
  // i.e. `autoPlay: 1000` will advance every 1 second

  cellAlign: "left",
  // alignment of cells, 'center', 'left', or 'right'
  // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)

  cellSelector: undefined,
  // specify selector for cell elements

  contain: true,
  // will contain cells to container
  // so no excess scroll at beginning or end
  // has no effect if wrapAround is enabled

  draggable: ">1",
  // enables dragging & flicking
  // if at least 2 cells

  dragThreshold: 10,
  // number of pixels a user must scroll horizontally to start dragging
  // increase to allow more room for vertical scroll for touch devices

  freeScroll: false,
  // enables content to be freely scrolled and flicked
  // without aligning cells

  friction: 0.5,
  // smaller number = easier to flick farther

  groupCells: false,
  // group cells together in slides

  initialIndex: 1,
  // zero-based index of the initial selected cell

  lazyLoad: true,
  // enable lazy-loading images
  // set img data-flickity-lazyload="src.jpg"
  // set to number to load images adjacent cells

  percentPosition: true,
  // sets positioning in percent values, rather than pixels
  // Enable if items have percent widths
  // Disable if items have pixel widths, like images

  prevNextButtons: true,
  // creates and enables buttons to click to previous & next cells

  pageDots: true,
  // create and enable page dots

  resize: true,
  // listens to window resize events to adjust size & positions

  rightToLeft: false,
  // enables right-to-left layout

  setGallerySize: true,
  // sets the height of gallery
  // disable if gallery already has height set with CSS

  watchCSS: false,
  // watches the content of :after of the element
  // activates if #element:after { content: 'flickity' }

  wrapAround: false,
  // at end of cells, wraps-around to first for infinite scrolling
});

// Зкакрытие открытого меню на мобилке при скролле

$(document).ready(function () {
  let prevScrollpos = window.pageYOffset;
  $(window).scroll(function (event) {
    lastScrollpos = window.pageYOffset;
    if (
      lastScrollpos > prevScrollpos + 30 ||
      lastScrollpos < prevScrollpos - 30
    ) {
      $(".header").removeClass("active");
      prevScrollpos = window.pageYOffset;
    }
  });
});
