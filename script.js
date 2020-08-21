$("#calcBtn").click(
    function(){
        let inputText = $("#inputText").val() ;
        let finalArray= getWords(inputText) ;
        let finalObj = makeObject(finalArray) ;
        let sortedArr = sortObject(finalObj) ;
        printTable(sortedArr) ;
        generateChart(sortedArr) ;
    }
) ;

function getWords(input){
    let wordsArr = input.split("");
    let arr =[] ;

    wordsArr.forEach((w) => {
        switch(w){
            case `,` : case `-` : case `—` : case `&` : case `!` : case `(` : case `)` :
            case `{` : case `}` : case `"` : case `[` : case `]` : case `;` : case `;` : 
            case `.` : case `/` : case `?` : case `_`: case `'` : case `’` : case `”` : case `“`: return ;
            case `\n`: arr.push(" ") ; break ;
            case `  `: arr.push(" ") ; break ;
            case `   `: arr.push(" ") ; break ;
            default :
                arr.push(w.toLowerCase()) ;
        }
    });

    let newText = arr.join("") ;
    let words = newText.split(" ") ;
    return words ; 
};

function makeObject(arr){

    let tempObj = {} ;

    arr.forEach( (ele) => {
        if(ele== ""){
            return ;
        }
        if(tempObj[ele]){
            tempObj[ele]++ ;
        }else{
            tempObj[ele] =1;
        }
    }) ;

    return tempObj ;
};

function sortObject(obj) {
    let arr = [];
    let prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'word': prop,
                'count': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) {
        return b.count - a.count;
    });
    return arr; // returns array
};

function printTable(countArr){
    countArr.splice(120) ;
    countArr.forEach((obj)=>{
        let c = obj.count ;
        let w = obj.word ;
        $("#table tbody").append('<tr> <td> '+ w +' </td> <td> '+ c +' </td> </tr>') ;
    }) ;
};

function generateChart(wcArr){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: wcArr.map((wc)=> wc.word),
            datasets: [{
                label: 'Word Frequency',
                data: wcArr.map((wc)=> wc.count) ,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}
