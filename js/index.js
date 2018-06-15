let stageCheck = 'https://www.thef2e.com/api/stageCheck'
let isSignUp = 'https://www.thef2e.com/api/isSignUp'
const theme = [
  {
    week : '第一週06/04(一)~06/11 (一)',
    title : '待辦清單Todolist',
    deadline : 'Jun 11, 2018 12:00:00'
  },
  {
    week : '第二週06/11(一)~06/18(一)',
    title : '篩選器filter',
    deadline : 'Jun 18, 2018 12:00:00'
  },
  {
    week : '第三週06/18(一)~06/25(一)',
    title : '敬請期待',
    deadline : 'Jun 25, 2018 12:00:00'
  },
  {
    week : '第四週06/25(一)~07/02(一)',
    title : '敬請期待',
    deadline : 'July 02, 2018 12:00:00'
  },
  {
    week : '第五週07/02(一)~07/09(一)',
    title : '敬請期待',
    deadline : 'July 09, 2018 12:00:00'
  },
  {
    week : '第六週07/09(一)~07/16(一)',
    title : '敬請期待',
    deadline : 'July 16, 2018 12:00:00'
  },
  {
    week : '第七週07/16(一)~07/23(一)',
    title : '敬請期待',
    deadline : 'July 23, 2018 12:00:00'
  },
  {
    week : '第八週07/23(一)~07/30(一)',
    title : '敬請期待',
    deadline : 'July 30, 2018 12:00:00'
  },
  {
    week : '第九週07/30(一)~08/06(一)',
    title : '敬請期待',
    deadline : 'August 6, 2018 12:00:00'
  },
]

const dl_stampe = [] //1-9週截止日期stampe

theme.forEach(function(dl){
 let temp = new Date(dl.deadline).getTime()
 dl_stampe.push(temp)
})

$('.submit').on('click',function(){
  $.ajax({
    type: 'POST',
    url: stageCheck,
    async: true,
    data: {
      email: $('#email').val()
    },
    success: function(res){
      if(res.length!=0){
        $('.process li').eq(res.length-1).nextAll().css({opacity: .4})
        $('.step_1').append(`<p class="start" id="t_3">目前您已進行到第${res.length}關，請點擊關卡查詢紀錄</p>`)
      
        $('.process li').on('click',function(){
          if($(this).index()>res.length-1){
            alert('尚未開放')
            return false;
        }
        var target = res[$(this).index()]
        $('.first').fadeOut(400)
        $('.wrap').slideDown(400)
        $('#theme').text(`《主題：${theme[target.stage-1].title}》`)
        $('#week').text(`${theme[target.stage-1].week}`)
        $('.skill').text(`挑戰領域：${target.tag}`)
        $('#upload').text(`上傳時間：${new Date(target.timeStamp).toISOString().slice(0,16).replace("T"," ")}`)
        $('.demourl').attr("href",`${target.url}`)
        if(target.timeStamp<dl_stampe[target.stage-1]){
          $('#status').text('完成狀態：恭喜挑戰成功！')
        }else{
          $('#status').text('很可惜！挑戰失敗')
        }
      })
        $('.back').on('click',function(){
          $('.first').fadeIn(400)
          $('.wrap').slideUp(400)
        })
        
      }else{
        console.log('err')
      }
      // console.log(res.length)
      //if(!res.success) return false;
      //var process = $('.process li').eq(res.length-1).position().left
    }
  })
  
  $.ajax({
    type: 'POST',
    url: isSignUp,
    async: false,
    data: {
      email: $('#email').val()
    },
    success: function(data){
      if(data.success){
        $('.search').hide()
        $('.step_1').append(`<p class="start" id="t_2">剛來到這個世界的${data.skill}，${data.nickName}，你好！</p>`)
        
      $('.step_1').animate({opacity:1,top:'50%'},500,function(){
         typeing($('#t_2'),80)
        
        setTimeout(function(){
          typeing($('#t_3'),100)
          $('.process').css({display: 'block'}).stop().animate({opacity:1, },1000)
        },2000)
      });
        
      }//if
      else{
        alert(data.message)
      }
      
    }
  })
  
})



function showinput(){
  $('.search input').fadeIn()
}

function typeing(element,speed) {
  let text = $(element).text();
  $(element).css({'display':'block'})
  $(element).text('')
  let i = 0;
  
  return new Promise(resolve => {
    let timer = setInterval(function(){
      if (i < text.length) {
        $(element).append(text.charAt(i));
        i++;
      }else{
        resolve(element,speed);
        clearInterval(timer);
      }
    },speed)
  });
  
}
async function go() {
  const a = await typeing($('#t_0'),100);
  const b = await typeing($('#t_1'),100);
  const c = await showinput();
  return a + b + c;
}

go()

//表單Email欄位自動完成?