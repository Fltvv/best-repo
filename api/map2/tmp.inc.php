<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="content-type" content="text/html" />
	<title>Северный морской путь</title>
    
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" href="http://iceroute.ru/api/lib/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/css/bootstrap-select.min.css" integrity="sha512-mR/b5Y7FRsKqrYZou7uysnOdCIJib/7r5QeJMFvLNHNhtye3xJp1TdJVPLtetkukFn227nKpXD9OjUc09lx97Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- 6. Подключить CSS виджета "Bootstrap datetimepicker" -->  
    <link rel="stylesheet" href="http://iceroute.ru/api/lib/datepicker/datepicker3.css" />
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=0bf693a3-841a-4f92-b3cf-0ef545c8b18b"></script>
</head>

<body>

<div style="width: 98%; margin: 0 auto;">
<form method="post" action="" id="form_jsFilter" class="mt-3 w-100">
   <div class="row">	
   
   <div class="col-md-3 mb-3">
     <input type="text" name="date_start" value="<?=$minDate;?>" class="form-control w-100 dateMask jsDatetimepickerPopup" placeholder="Дата, от" />
   </div>
   
   <div class="col-md-3 mb-3">
     <input type="text" name="date_finish" value="<?=$maxDate;?>" class="form-control w-100 dateMask jsDatetimepickerPopup" placeholder="Дата, до" />
   </div>
   
   <div class="col-md-3 mb-3">
     <select class="form-control">
       <option value="">Выберите корабль</option>
       <?foreach($ships2 as $sh):?>
       <option value="<?=$sh['id'];?>"><?=$sh['name'];?></option>
       <?endforeach;?>
     </select>
   </div>
   
   <div class="col-md-3">
     <input type="hidden" name="ajaxLoad" value="jsAjaxLoad" />
     <input type="hidden" name="alert" value="" />
     <button class="send_form btn btn-primary w-100 mb-3" id="jsFilter">Показать</button>
   </div>
   
   
   </div>
</form>

<div id="jsAjaxLoad">
<div id="map" style="width:100%; height: 100vh;"></div>

<script type="text/javascript">
        // Как только будет загружен API и готов DOM, выполняем инициализацию
        ymaps.ready(init);
 
        function init () {
            // Создание экземпляра карты и его привязка к контейнеру с
            // заданным id ("map")
            var myMap = new ymaps.Map('map', {
                    // При инициализации карты, обязательно нужно указать
                    // ее центр и коэффициент масштабирования
                    center: [74.4058289585647,57.60317449951157],
                    zoom: <?if(MOBILE==true):?>3<?else:?>4<?endif;?>,
                    type: 'yandex#hybrid'
                });
                
               	<?foreach($coords as $key=>$val):?>
                 var geometry<?=$key;?> = [<?=$val;?>],
 
			     properties<?=$key;?> = {
				   hintContent: "Маршрут <?=$key;?>"
			     },
			     options<?=$key;?> = {
				  draggable: false,
				  strokeColor: '#2b6ed1',
				  strokeWidth: 5,
                  strokeStyle: 'dash'
                 },
			     
                 polyline<?=$key;?> = new ymaps.Polyline(geometry<?=$key;?>, properties<?=$key;?>, options<?=$key;?>);
 
			     myMap.geoObjects.add(polyline<?=$key;?>);	
                 
                 var placemark<?=$key;?> = new ymaps.Placemark([<?=$routes[$key][0];?>], {
                    balloonContentBody: [
                    '<div>',
                    '<strong><?=$ships[$key]['name'];?></strong>',
                    '<br/>',
                    'Класс: <?=$ships[$key]['ice_class'];?>',
                    '<br/>',
                    'ИМО: <?=$ships[$key]['imo'];?>',
                    '<br/>',
                    'Скорость: <?=$ships[$key]['speed'];?> узлов/час',
                    '<br/>',
                    'Протяжённость маршрута: <?=round($distance[$key]);?> миль',
                    '<br/>',
                    'Время прохождения: 2 д. 14 ч.',
                    '</div>'
                    ].join('')
                 }, {
                   pixelPerfect: false,
                   iconLayout: 'default#image',
                   iconImageHref: '/img/<?=$ships[$key]['img'];?>',
                   iconImageSize: [50, 50],
                   iconImageOffset: [-30, -30]
                 },
                 );

                 myMap.geoObjects.add(placemark<?=$key;?>);	
                 
                 var coordinates<?=$key;?> = [<?=$val;?>];
                 var currentIndex<?=$key;?> = 0;
                 var times<?=$key;?> = [0,<?=$times[$key];?>];
                 
                 function animateMarker<?=$key;?>() {
                   placemark<?=$key;?>.geometry.setCoordinates(coordinates<?=$key;?>[currentIndex<?=$key;?>]);
                   if (currentIndex<?=$key;?> < coordinates<?=$key;?>.length - 1) {
                     currentIndex<?=$key;?>++;
                     
                     setTimeout(animateMarker<?=$key;?>, times<?=$key;?>[currentIndex<?=$key;?>]);
                   }
                 }

            animateMarker<?=$key;?>();
              
            <?endforeach;?>
        }
    </script>
</div>
</div>
    <script src="http://iceroute.ru/api/lib/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/js/bootstrap-select.min.js" integrity="sha512-FHZVRMUW9FsXobt+ONiix6Z0tIkxvQfxtCSirkKc5Sb4TKHmqq1dZa8DphF0XqKb3ldLu/wgMa8mT6uXiLlRlw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!-- 4. Подключить скрипт виджета "Bootstrap datetimepicker" -->
    <script type="text/javascript" src="http://iceroute.ru/api/lib/datepicker/bootstrap-datepicker5.js"></script>

    <script type="text/javascript">
    $('body').on('focus', '.jsDatetimepickerPopup', function() {
        $(this).datepicker(
          {pickTime: false, 
          language: 'ru'
          });
    });
    </script> 
    
    <script src="http://iceroute.ru/map2/js/main.js"></script>
</body>
</html>