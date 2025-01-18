const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//serving static files 

app.use('/public', express.static(path.join(__dirname, '../client/public')));
app.use('/src', express.static(path.join(__dirname, '../Client/src')));
app.use('/css', express.static(path.join(__dirname, '../client/src/css')));
app.use('/img', express.static(path.join(__dirname, '../client/src/img')));
app.use('/js', express.static(path.join(__dirname, '../client/src/js')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// Endpoint to handle form submission and generate PDFs
app.post('/generate', (req, res) => {
  const { name, projectTitle, subTitle,university, degree, branch, specialization, guideName, designation, department, year, template, action } = req.body;

  // Create a new jsPDF document
  const doc = new jsPDF();

  if (template === 'Template 1') {
    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("A Project Report", 105, 20, { align: "center" });

    // Project Title
    doc.setFontSize(14);
    doc.text("On", 105, 30, { align: "center" });
    doc.text(`${projectTitle}`, 105, 40, { align: "center" }
    );
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    doc.text("Subtitle:", 50, 50, {
      align: "center",
    });
    doc.text(`${subTitle}`, 105, 50, {
      align: "center",
    });

    // Submitted To
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text("Submitted to", 105, 70, { align: "center" });
    doc.setFont("times", "bold");
    doc.text(`${university}`,105,80,{ align: "center" });
    doc.setFont("times", "normal");
    doc.text(`${degree}`, 105, 90, { align: "center" });
    doc.text("In", 105, 100, { align: "center" });
    doc.text(`${branch}`, 105, 110, { align: "center" });
    doc.text("specialization in", 105, 120, { align: "center" });

    doc.setFont("times", "italic");
    doc.text(`${specialization}`, 105, 130, { align: "center" });

    // Authors
    doc.setFont("times", "normal");
    doc.text("By", 105, 140, { align: "center" });
    doc.text(`${name}`, 105, 150, { align: "center" });

    // Guidance
    doc.text("Under the Guidance of", 105, 170, { align: "center" });
    doc.setFont("times", "bold");
    doc.text(`${guideName}`, 105, 180, { align: "center" });
    doc.setFont("times", "normal");
    doc.text(`${designation}`, 105, 190, { align: "center" });

    //College Logo
    // doc.addImage(imgUrl, 'PNG', 20, 20, 105, 210);

    // Department
    doc.setFont("times", "bold");
    doc.text(`${department}`, 105, 240, {
      align: "center",
    });
    doc.text("Shri Shankaracharya Technical Campus, Junwani, Bhilai", 105, 250, {
      align: "center",
    });
  } 
  else if (template === 'Template 2') {
    // Template 2: Boxed Design

    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 278); // Outer box

    //Frontpage
    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("A Project Report", 105, 20, { align: "center" });

    // Project Title
    doc.setFontSize(14);
    doc.text("On", 105, 30, { align: "center" });
    doc.text(`${projectTitle}`, 105, 40, { align: "center" }
    );
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    doc.text("Subtitle:", 50, 50, {
      align: "center",
    });
    doc.text(`${subTitle}`, 105, 50, {
      align: "center",
    });

    // Submitted To
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text("Submitted to", 105, 70, { align: "center" });
    doc.setFont("times", "bold");
    doc.text(`${university}`,105,80,{ align: "center" });
    doc.setFont("times", "normal");
    doc.text(`${degree}`, 105, 90, { align: "center" });
    doc.text("In", 105, 100, { align: "center" });
    doc.text(`${branch}`, 105, 110, { align: "center" });
    doc.text("specialization in", 105, 120, { align: "center" });

    doc.setFont("times", "italic");
    doc.text(`${specialization}`, 105, 130, { align: "center" });

    // Authors
    doc.setFont("times", "normal", "bold");
    doc.text("By", 105, 140, { align: "center" });
    doc.text(`${name}`, 105, 150, { align: "center" });

    // Guidance
    doc.text("Under the Guidance of", 105, 170, { align: "center" });
    doc.setFont("times", "bold");
    doc.text(`${guideName}`, 105, 180, { align: "center" });
    doc.setFont("times", "normal");
    doc.text(`${designation}`, 105, 190, { align: "center" });

    //College Logo
    // doc.addImage(imgUrl, 'PNG', 20, 20, 105, 210);

    // Department
    doc.setFont("times", "bold");
    doc.text(`${department}`, 105, 240, {
      align: "center",
    });
    doc.text("Shri Shankaracharya Technical Campus, Junwani, Bhilai", 105, 250, {
      align: "center",
    });

    // second page
    doc.addPage();
    
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 275); // Outer box

  }

  // Save the document to a buffer
  const pdfBuffer = doc.output('arraybuffer');

  if (action === 'preview') {
    // Send the PDF data as a base64 string for preview
    const base64String = Buffer.from(pdfBuffer).toString('base64');
    res.json({ preview: `data:application/pdf;base64,${base64String}` });
  } else {
    // Send the PDF file to the client for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="project_front_page.pdf"');
    res.send(Buffer.from(pdfBuffer));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const formHTML = "../client/public/index.html";


if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public');
}
fs.writeFileSync('./public/index.html', formHTML);
