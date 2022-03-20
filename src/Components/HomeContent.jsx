import { useEffect, useState } from "react";
import Header from "./Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeContent = () => {
    // Decalring all states
    const [file, setfile] = useState('Images/main.jpg');

    // Showing all notification card
    const notify = () => toast.success("Code Copied...", {
        position: "bottom-right",
        autoClose: 3000
    });
    const ImageUploaded = () => toast.success("Image Uploaded...", {
        position: "bottom-right",
        autoClose: 3000
    });

    // Color Codes
    const [color, setcolor] = useState('rgba(0, 255, 255, 255)');
    const [oldcolor, setoldcolor] = useState('rgb(0, 0, 0)');
    const [newhexcode, setnewhexcode] = useState('#000000');
    const [oldhexcode, setoldhexcode] = useState('#000000');
    const [oldrgbcode, setoldrgbcode] = useState('rgb(0, 0, 0)');
    const [mode, setmode] = useState('');

    // Changing theme color
    const changeTheme = () => {
        mode === 'active' ? setmode('') : setmode('active')
    }

    useEffect(() => {
        let myCanvas = document.getElementById('myCanvas');
        var context = myCanvas.getContext('2d');
        var image = new Image();
        image.src = file;
        image.crossOrigin = 'Anonymous';
        const setImage = (width, height) => {
            image.onload = function () {
                myCanvas.width = width;
                myCanvas.height = height;
                context.drawImage(image, 0, 0, width, height);
                image.style.objectFit = 'cover';
            };
        }
        if (window.screen.width < 900 && window.screen.width > 550) {
            setImage(510, 380);
        } else if (window.screen.width < 550 && window.screen.width > 420) {
            setImage(380, 280);
        } else if (window.screen.width < 420 && window.screen.width > 390) {
            setImage(350, 230);
        } else {
            setImage(730, 520);
        }
    }, [file, mode]);

    const changeColor = (event) => {
        let myCanvas = document.getElementById('myCanvas');
        var context = myCanvas.getContext('2d');

        var canvasGapX = myCanvas.offsetLeft;
        var pixelData = context.getImageData(event.pageX - canvasGapX - 20, event.pageY - (window.screen.width > 1350 ? 200 : 179) - 43, 1, 1);
        var data = pixelData.data;
        const color = `rgb(${data[0]}, ${data[1]}, ${data[2]})`
        function rgbToHex(red, green, blue) {
            const rgb = (red << 16) | (green << 8) | (blue << 0);
            return '#' + (0x1000000 + rgb).toString(16).slice(1);
        }
        setoldhexcode(rgbToHex(data[0], data[1], data[2]));
        setcolor(color);
    }

    // Setting selected color to box
    const setBoxColor = () => {
        setoldcolor(color);
        setoldrgbcode(color);
        setnewhexcode(oldhexcode);
    }

    // Coping HEX code
    const copyhex = () => {
        let inputElement = document.createElement('input');
        inputElement.setAttribute('value', newhexcode);
        document.body.appendChild(inputElement);
        inputElement.select();
        document.execCommand('copy');
        inputElement.parentNode.removeChild(inputElement);
        notify();
    }

    // Coping RGB code
    const copyrgb = () => {
        let inputElement = document.createElement('input');
        inputElement.setAttribute('value', oldrgbcode);
        document.body.appendChild(inputElement);
        inputElement.select();
        document.execCommand('copy');
        inputElement.parentNode.removeChild(inputElement);
        notify();
    }

    // Uploading Image and setting it to container
    let inputImg;
    const getFile = (event) => {
        inputImg = event.target.files[0];
        const fileType = inputImg.type;
        let validExtension = ["image/png", "image/jpeg", "image/jpg"];
        if (validExtension.includes(fileType)) {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                let fileUrl = fileReader.result;
                setfile(fileUrl);
            }
            fileReader.readAsDataURL(inputImg);
            ImageUploaded();
        } else {
            console.log("Sorry.. This is not an image file...");
        }
    };

    return (
        <div className={`home-container ${mode}`} id="mainContainer">
            <ToastContainer theme='dark' />
            <div className="top-back">
                <Header updateTheme={changeTheme} />
            </div>
            <div className="bottom-back">
                <div className="content">
                    <div className="left">
                        <div className="img-box">
                            <canvas id='myCanvas' onMouseMove={changeColor} onClick={setBoxColor}>
                                This Website is not supported in your browser...
                            </canvas>
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            <div className="color-code">
                                <h3>Colors</h3>
                                <div className="hex-code">
                                    <div className="color" style={{ backgroundColor: oldcolor }}></div>
                                    <div className="left">
                                        <div className="code">
                                            <p>HEX: {newhexcode}</p>
                                            <img src="Images/copy.png" alt="copy-button" onClick={copyhex} />
                                        </div>
                                        <div className="code">
                                            <p>RGB : {oldrgbcode}</p>
                                            <img src="Images/copy.png" alt="copy-button" onClick={copyrgb} />
                                        </div>
                                    </div>
                                    <div className="color" style={{ backgroundColor: color }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <button>
                                <label htmlFor="Imgfile">Upload Image</label>
                            </button>
                            <input type="file" name="file" id="Imgfile" onChange={getFile} />
                            <p>We understand that your privacy is important. That's why <span className="pink">No data sent to our database.</span> It's all magic of Browser.</p>
                        </div>
                    </div>
                </div>
                <div className="content-card">
                    <h1><strong>Image Color Picker</strong></h1>
                    <p><strong>Image color picker</strong> is an tool which provide you utility to extract color from image in different <strong>color code</strong> formats like HEX, RGB color code. To get color code of your image first you have to upload your image so click on <label style={{color: "red", cursor: "pointer"}} htmlFor="Imgfile">upload image</label> button and then select image through which you want to get color. then it will upload your image and it will set it to the image box and for confimation you will get notification. Now you are ready to get color just hover on image and click on that pixel. Your selected <strong>image color</strong> will show inside color box and your color code also. Just click on <span className="pink">copy button</span> to copy color code. you can copy any HEX or RGB color.</p>
                </div>
            </div>
        </div>
    );
};

export default HomeContent;