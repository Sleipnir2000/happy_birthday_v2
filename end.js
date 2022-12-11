function getPresent() {
    alert("给你一些宝贝");
    const link = document.createElement('a');
    link.style.display = "none";
    link.href = "presents.zip";
    link.download = "？？？";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}

const present_blocks = document.getElementsByClassName("art_box");
for (let block of present_blocks) {
    block.addEventListener("click", getPresent);
}