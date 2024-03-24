const totalSize = 100000000
let sizeAvailable;
let storageUsage;
localLoad();
const imgRege =new RegExp( /\.(gif|jpe?g|png|)$/i);
let multiFilesInput = document.getElementById('mult-img-input')
let validParams = {
    files : null,
    filesSize : 0,
    err : false,
}
const filesValidate =(validObj,regex)=>{
    for (let i = 0; i < validObj.files.length; i++) {
        if(!regex.test(validObj.files[i].name)){      //files are not an image format
            alert("File format isn't supported")
            validObj.err=true;
        }
        validObj.filesSize += validObj.files[i].size
    }
    if(validObj.filesSize>sizeAvailable){     //file size is too big
        alert("There is not enough space on the disk")
        validObj.err=true;
    }
}
const displayUpdate = (count,size) =>{
    if(count!== "" || size !== ""){
    document.getElementById('count').innerHTML = count+ " Files"
    document.getElementById('file-size').innerHTML = size + " MB"
    }else{
    document.getElementById('count').innerHTML =count;
    document.getElementById('file-size').innerHTML =size;
    }
}
multiFilesInput.onchange = ()=>{
    validParams.files = multiFilesInput.files
    validParams.filesSize = 0;
    filesValidate(validParams,imgRege);
    if(validParams.err)
        multiFilesInput.value= "";
    else
        displayUpdate(validParams.files.length,(validParams.filesSize/1000000).toFixed(2))
    

}
document.getElementById('uplBtn').onclick = () =>{
    storageUsage+=parseInt(validParams.filesSize)
    sizeAvailable-=parseInt(validParams.filesSize)
    updateStorage();
    multiFilesInput.value= "";
    displayUpdate("","");
    localSave();
}
document.getElementById('storage-reset').onclick=()=>{
    sizeAvailable = totalSize;
    storageUsage = 0;
    localSave();
    updateStorage();
}
updateStorage();

function updateStorage(){
    let progressBarPercent = (storageUsage/totalSize*100).toFixed(0)
    let span = document.createElement('span')
    span.innerText = "MB left"
    document.getElementById('storage-usage').innerHTML = (storageUsage/1000000).toFixed(2)+" MB"
    let storageDiv= document.getElementById('storage-available')
    storageDiv.innerHTML = (sizeAvailable/1000000).toFixed(0)+" "
    storageDiv.append(span)
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