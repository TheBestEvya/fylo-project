const totalSize = 100000000
var sizeAvailable;
var storageUsage;
localLoad();
const imgRege =new RegExp( /\.(gif|jpe?g|png|)$/i);

var multiFilesInput = document.getElementById('mult-img-input')     //multiple images input element
multiFilesInput.onchange = ()=>{
    let currentFilesSize = 0;
    let err= false;
    for (let i = 0; i < multiFilesInput.files.length; i++) {
        if(!imgRege.test( multiFilesInput.files[i].name)){      //files are not an image format
        alert("File format isn't supported")
            err=true;
    }
        currentFilesSize+=multiFilesInput.files[i].size
    }
    if(currentFilesSize>sizeAvailable){     //file size is too big
    alert("There is not enough space on the disk")
    err=true;
    }
    if(err){
        multiFilesInput.value= ""; // resets file explorer cause by an error
    }else{  //display the files
        document.getElementById('count').innerHTML = multiFilesInput.files.length+ " Files"
        document.getElementById('file-size').innerHTML = (currentFilesSize/1000000).toFixed(2) + " MB"
    }
}
document.getElementById('uplBtn').onclick = () =>{ //upload button clicking
    let currentFilesSize = 0;
    for (let i = 0; i < multiFilesInput.files.length; i++) {
        currentFilesSize += multiFilesInput.files[i].size
    }
    console.log(currentFilesSize + "Current file size")
    storageUsage+=parseInt(currentFilesSize)
    sizeAvailable-=parseInt(currentFilesSize)
    updateStorage();
    multiFilesInput.value= ""; // resets file explorer after using the files selected
    document.getElementById('count').innerHTML ="";
    document.getElementById('file-size').innerHTML ="";
   localSave();
}
updateStorage();

function updateStorage(){
    console.log((storageUsage/totalSize*100).toFixed(0) + " Progress bar percent")
    let progressBarPercent = (storageUsage/totalSize*100).toFixed(0)
    let span = document.createElement('span')
    span.innerText = "MB left"
    document.getElementById('storage-usage').innerHTML = (storageUsage/1000000).toFixed(2)+" MB"
    document.getElementById('storage-available').innerHTML = (sizeAvailable/1000000).toFixed(0)+" "
    document.getElementById('storage-available').append(span)
    document.getElementsByClassName('gradient-bar')[0].style.width=progressBarPercent+"%"
    
}
function localSave(){
    localStorage.setItem("sizeLeft",sizeAvailable);
    localStorage.setItem("storageUse",storageUsage);
}
function localLoad(){
    if(localStorage.getItem("sizeLeft") != 'undefined'){
    sizeAvailable =parseInt( localStorage.getItem("sizeLeft"));
    }else
    sizeAvailable = totalSize;
    if(localStorage.getItem("storageUse") != 'undefined'){
    storageUsage =parseInt( localStorage.getItem("storageUse"));
    }else
    storageUsage = 0;
}