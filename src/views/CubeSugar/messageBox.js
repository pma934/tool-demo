export const  messageBox = async(message) => {
    const div = document.createElement("div");
    div.innerText = message;
    const btn1 = document.createElement("button");
    btn1.innerText = "继续";
    const btn2 = document.createElement("button");
    btn2.innerText = "取消";
    div.appendChild(btn1);
    div.appendChild(btn2);
    div.style = `   
        position: fixed;
        z-index: 99999;
        background-color: gainsboro;
        height: 400px;
        width: 400px;
        top: calc(50vh - 200px);
        left: calc(50vw - 200px);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;`;
    document.body.appendChild(div);

    return new Promise((re, rj) => {
      btn1.onclick = re;
      btn2.onclick = rj;
    }).then(()=>{
      document.body.removeChild(div);
      return true;
    }).catch((e)=>{
      document.body.removeChild(div);
      throw e;
    })
  };