// import { jsPDF } from "jspdf";
const { jsPDF } = window.jspdf;
let doc = new jsPDF({
    orientation: 'landscape',
});
const button_download_pdf = document.getElementById("download-pdf");
const course_name_input = document.getElementById("subject");
const subtitle_input = document.getElementById("task");
const number_of_boxes_input = document.getElementById("no-boxes");
const shape_input = document.getElementById("shape");
const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();
const margin = 10;
const distance = 5;
const radius = 15; 
const squareSize = 30;
const spacing = 10;
const shapeSize = 30;
const maxShapesPerRow = Math.floor((pageWidth - 2 * margin) / (shapeSize + spacing));
const maxShapesPerColumn = Math.floor((pageHeight - 2 * margin) / (shapeSize + spacing));
let course_name;
let subtitle;
let number_of_boxes;
let shape;
let x;
let y;
let rndm_number;
let box_numbers_array = [];


function shuffleArray(){
    box_numbers_array = [...Array(number_of_boxes).keys()].map(i => i + 1);
    for(let i = box_numbers_array.length - 1; i > 0; i--){
        const random = Math.floor(Math.random() * (i+1));
        [box_numbers_array[i],box_numbers_array[random]] = [box_numbers_array[random],box_numbers_array[i]];
    }
}


function generatePDF() {
    course_name = course_name_input.value;
    subtitle = subtitle_input.value;
    number_of_boxes = parseInt(number_of_boxes_input.value);
    shuffleArray();
    shape = shape_input.value;
    doc.setFont("courier");
    doc.setFontSize(35);
    doc.text(course_name, pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(25);
    doc.text(subtitle, pageWidth / 2, 35, { align: "center" });
    x = margin;
    y = 55;
    for(let i = 0; i < number_of_boxes; i++){
        if(shape == "circle"){
            doc.circle(x + shapeSize / 2, y + shapeSize / 2, shapeSize / 2);
            rndm_number = Math.floor(Math.random()*number_of_boxes);
            doc.text(box_numbers_array[i].toString(), x + (shapeSize / 2) - 2, y + (shapeSize / 2) +2);
        }
        else if(shape == "square"){
            doc.rect(x, y, shapeSize, shapeSize);
            rndm_number = Math.floor(Math.random()*number_of_boxes);
            doc.text(box_numbers_array[i].toString(), x + (shapeSize / 2) - 2, y + (shapeSize / 2) +2);
        }
        x += shapeSize + spacing;
        if(x + shapeSize > pageWidth - margin){
            x = margin;
            y += shapeSize + spacing;
        }
        if (y + shapeSize > pageHeight - margin) {
            doc.addPage();
            x = margin;
            y = margin;
        }
    }
}


// function resetValues(){
//     course_name = "";
//     subtitle = "";
//     number_of_boxes = number_of_boxes_input.value;
//     shape = shape_input.value;
// }

function downloadPDF() {
    // alert('Button wurde geklickt!');
    doc = new jsPDF({
        orientation: 'landscape',
    });
    generatePDF();
    // resetValues();
    doc.save("coloritdone.pdf");

}

button_download_pdf.addEventListener("click", downloadPDF);

