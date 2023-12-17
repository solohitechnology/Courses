const express = require('express');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User');
const Seminar = require('../model/seminar');
const pdf = require('html-pdf');

router.post('/generate-certificate/single', async (req, res) => {
    const { name, course, seId, email } = req.body;

    const logoPath = path.join(__dirname, 'logo_path', 'logo.jpeg');
    const logoData = fs.readFileSync(logoPath);
    const logoBase64 = logoData.toString('base64');
    const logoMimeType = mime.lookup(logoPath);

    const logoPath2 = path.join(__dirname, 'logo_path', 'iip2.jpg');
    const logoData2 = fs.readFileSync(logoPath2);
    const logoBase642 = logoData2.toString('base64');
    const logoMimeType2 = mime.lookup(logoPath2);

    const logoSign = path.join(__dirname, 'logo_path', 'sign.jpeg');
    const logoSignData = fs.readFileSync(logoSign);
    const logoBase64S = logoSignData.toString('base64');
    const logoMimetype3 = mime.lookup(logoSign);




    const registeredSeminarId = seId;
     await User.findOneAndUpdate(
        { email: email },
        { $pull: { registeredSeminars: registeredSeminarId } },
        { new: true }
    );




    try {
        // ... Existing code ...

        const html = `  <html>

              <head>
              <style type='text/css'>
              body,
              html {
                  margin: 0;
                  padding: 0;
              }
        
              body {
                  color: black;
                  display: table;
                  font-family: Georgia, serif;
                  font-size: 24px;
                  text-align: center;
              }
        
              .container {
                  border: 5px double rgb(107, 105, 116);
                  width: 11in; 
                  height: 6.3in;
                  display: flex;
                  flex-direction: column;
                  vertical-align: middle;
                  margin-left: 50px;
                  position: relative;
                  background-color: rgb(227, 227, 238);
                  margin-top: 30px;
                  background-image: linear-gradient(to bottom right, rgba(120, 107, 177, 0) to top left, rgb(139, 138, 148) 50%);
                  background-size: 100% 100%;
                  box-sizing: border-box;
                  box-shadow: 3px 3px 10px 3px;
              }
        
              .container:before,
              .container:after {
                  content: '';
                  position: absolute;
                  width: 20px;
                  height: 20px;
                  border: 5px double rgb(107, 105, 116);
                  border-radius: 50%;
              }
        
              .container:before {
                  top: -15px;
                  left: -15px;
              }
        
              .sign {
                  position: absolute;
                  bottom: 20;
                  left: 80;
        
              }
        
              .venu {
                  position: absolute;
                  bottom: 40;
                  right: 80;
              }
        
              .sign img {
                  width: 100px;
                  height: 100px;
                  border-radius: 100%;
                  box-shadow: 2px 2px black;
              }
        
              .container:after {
                  bottom: -15px;
                  right: -15px;
              }
        
              .logo {
                  color: rgb(42, 25, 80);
                  position: relative;
              }
        
              .marquee {
                  color: rgb(81, 71, 124);
                  font-size: 48px;
                  margin: 0;
              }
        
              .assignment {
                  margin: 20px;
              }
        
              .person {
                  border-bottom: 2px solid black;
                  font-size: 32px;
                  font-style: italic;
                  margin: 20px auto;
                  width: 400px;
              }
        
              .reason {
                  margin: 5px;
              }
        
              span img {
                  width: 100px;
                  height: 100px;
                  position: absolute;
                  right: 450;
                  bottom: 30;
                  border-radius: 50%;
                  z-index: 1;
              }
        
              p {
                  position: absolute;
                  top: 0;
                  right: 5px;
        
              }
        
              p img {
                  width: 100px;
                  height: 100px;
                  border-radius: 50%;
              }
        
              .triangle_s {
                  width: 0;
                  height: 0;
                  border-left: 50px solid transparent;
                  border-right: 50px solid transparent;
                  border-bottom: 100px solid rgb(122, 110, 143);
                  border-bottom-right-radius: 100%;
                  /* border-top-left-radius: 100%; */
                  margin-top: 15px;
                  margin-left: 0;
                  position: absolute;
                  transform: rotate(130deg);
              }
        
              .triangle {
                  position: absolute;
                  bottom: -40px;
                  top: 0;
                  width: 0;
                  height: 0;
                  border-right: 70px solid transparent;
                  border-bottom: 563px solid rgb(42, 25, 80);
                  z-index: 1;
              }
        
              h6 {
                  font-size: 15px;
                  position: absolute;
                  top: 573;
                  right: 230;
        
               }
        
               .triangle_1 {
                   position: absolute;
                  bottom: -40px;
                  top: 0;
                  width: 15px;
                  height: 0;
                  border-right: 30px solid transparent;
                  border-bottom: 563px solid rgb(217, 214, 221);
                  right: 0;
              }
            </style>
              </head>
        
              <body>
                  <div class="container">
        
                      <!-- <div class="triangle_s"></div> -->
        
        
                      <div class="logo">
                          <h4>
                              Department Of Research and Publication
                              <br>
                              <strong>2IP</strong>
                          </h4>
                          <div class="triangle"></div>
        
                          <div class="triangle_1 "></div>
        
        
                          <br>
                          <div class="marquee">
                              CERTIFICATE OF PARTICIPATION
                          </div>
                      </div>
        
                      <div class="assignment">
                          This is to certify that
                      </div>
        
                      <div class="person">
                      ${name}
                      </div>
        
                      <div class="reason">
                          Whose name appears on this certificate,
                          has successfully completed <br/> the course in 
                            ${course}
                      </div>
                      <span>
                      <img src="data:image/jpeg;base64,${logoBase642}" alt="" />
                      </span>
                      <p>
                       <img class="logo" src="data:image/jpeg;base64,${logoBase64}" alt="Logo" />
                      </p>
                      <div class="sign">
                      <img src="data:image/jpeg;base64,${logoBase64S}" alt="" />
                      <legend>Director</legend>
                  </div>
        
                  <div class="venu">
                      Venu: Online
                      <br>
                      2x5rvhf6
                  </div>
                  </div>
                  <h6>visit https://ogenduacademy.com/certificate/user/auth   to verify the authenticity of this certificate</h6>
        
        
                  </div>
              </body>
        
              </html>`;

        // Use html-pdf to convert HTML to PDF
        pdf.create(html, { width: '12in', height: '8in' }).toBuffer((err, pdfBuffer) => {
            if (err) {
                console.error('Certificate generation error:', err);
                res.status(500).send('Certificate generation error');
            } else {
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="certificate.pdf"',
                });
                res.send(pdfBuffer);

            }
        });
    } catch (error) {
        console.error('Certificate generation error:', error);
        res.status(500).send('Certificate generation error');
    }
});




// router.post('/generate-certificate/single', async (req, res) => {
//   const { name, course, seId, email } = req.body;



//   //  existing code to find user and do other operations...
//   const registeredSeminarId = seId;
//   const user = await User.findOneAndUpdate(
//     { email: email },
//     { $pull: { registeredSeminars: registeredSeminarId } },
//     { new: true }
//   );

//   console.log(user.username);
//   console.log(user.registeredSeminars);

//   try {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toLocaleDateString();

//     // Read the logo image file
//     const logoPath = path.join(__dirname, 'logo_path', 'logo.jpeg');
//     const logoData = fs.readFileSync(logoPath);
//     const logoBase64 = logoData.toString('base64');
//     const logoMimeType = mime.lookup(logoPath);

//     const logoPath2 = path.join(__dirname, 'logo_path', 'iip2.jpg');
//     const logoData2 = fs.readFileSync(logoPath2);
//     const logoBase642 = logoData2.toString('base64');
//     const logoMimeType2 = mime.lookup(logoPath2);

//     const logoSign = path.join(__dirname, 'logo_path', 'sign.jpeg');
//     const logoSignData = fs.readFileSync(logoSign);
//     const logoBase64S = logoSignData.toString('base64');
//     const logoMimetype3 = mime.lookup(logoSign);

//     const html = `  <html>

//               <head>
//               <style type='text/css'>
//               body,
//               html {
//                   margin: 0;
//                   padding: 0;
//               }

//               body {
//                   color: black;
//                   display: table;
//                   font-family: Georgia, serif;
//                   font-size: 24px;
//                   text-align: center;
//               }

//               .container {
//                   border: 5px double rgb(107, 105, 116);
//                   width: 100vh;
//                   height: 563px;
//                   display: flex;
//                   flex-direction: column;
//                   vertical-align: middle;
//                   margin-left: 50px;
//                   position: relative;
//                   background-color: rgb(227, 227, 238);
//                   margin-top: 30px;
//                   background-image: linear-gradient(to bottom right, rgba(120, 107, 177, 0) 50%, rgb(139, 138, 148) 50%);
//                   background-size: 100% 100%;
//                   box-sizing: border-box;
//                   box-shadow: 3px 3px 10px 3px;
//               }

//               .container:before,
//               .container:after {
//                   content: '';
//                   position: absolute;
//                   width: 20px;
//                   height: 20px;
//                   border: 5px double rgb(107, 105, 116);
//                   border-radius: 50%;
//               }

//               .container:before {
//                   top: -15px;
//                   left: -15px;
//               }

//               .sign {
//                   position: absolute;
//                   bottom: 20;
//                   left: 80;

//               }

//               .venu {
//                   position: absolute;
//                   bottom: 40;
//                   right: 80;
//               }

//               .sign img {
//                   width: 100px;
//                   height: 100px;
//                   border-radius: 100%;
//                   box-shadow: 2px 2px black;
//               }

//               .container:after {
//                   bottom: -15px;
//                   right: -15px;
//               }

//               .logo {
//                   color: rgb(42, 25, 80);
//                   position: relative;
//               }

//               .marquee {
//                   color: rgb(81, 71, 124);
//                   font-size: 48px;
//                   margin: 0;
//               }

//               .assignment {
//                   margin: 20px;
//               }

//               .person {
//                   border-bottom: 2px solid black;
//                   font-size: 32px;
//                   font-style: italic;
//                   margin: 20px auto;
//                   width: 400px;
//               }

//               .reason {
//                   margin: 5px;
//               }

//               span img {
//                   width: 100px;
//                   height: 100px;
//                   position: absolute;
//                   right: 450;
//                   bottom: 30;
//                   border-radius: 50%;
//                   z-index: 1;
//               }

//               p {
//                   position: absolute;
//                   top: 0;
//                   right: 5px;

//               }

//               p img {
//                   width: 100px;
//                   height: 100px;
//                   border-radius: 50%;
//               }

//               .triangle_s {
//                   width: 0;
//                   height: 0;
//                   border-left: 50px solid transparent;
//                   border-right: 50px solid transparent;
//                   border-bottom: 100px solid rgb(122, 110, 143);
//                   border-bottom-right-radius: 100%;
//                   /* border-top-left-radius: 100%; */
//                   margin-top: 15px;
//                   margin-left: 0;
//                   position: absolute;
//                   transform: rotate(130deg);
//               }

//               .triangle {
//                   position: absolute;
//                   bottom: -40px;
//                   top: 0;
//                   width: 0;
//                   height: 0;
//                   border-right: 70px solid transparent;
//                   border-bottom: 563px solid rgb(42, 25, 80);
//                   z-index: 1;
//               }

//               h6 {
//                   font-size: 15px;
//                   position: absolute;
//                   top: 533;
//                   right: 200;

//                }

//                .triangle_1 {
//                    position: absolute;
//                   bottom: -40px;
//                   top: 0;
//                   width: 15px;
//                   height: 0;
//                   border-right: 30px solid transparent;
//                   border-bottom: 563px solid rgb(217, 214, 221);
//                   right: 0;
//               }
//             </style>
//               </head>

//               <body>
//                   <div class="container">

//                       <!-- <div class="triangle_s"></div> -->


//                       <div class="logo">
//                           <h4>
//                               Department Of Research and Publication
//                               <br>
//                               <strong>2IP</strong>
//                           </h4>
//                           <div class="triangle"></div>

//                           <div class="triangle_1 "></div>


//                           <br>
//                           <div class="marquee">
//                               CERTIFICATE OF PARTICIPATION
//                           </div>
//                       </div>

//                       <div class="assignment">
//                           This is to certify that
//                       </div>

//                       <div class="person">
//                       ${name}
//                       </div>

//                       <div class="reason">
//                           Whose name appears on this certificate,
//                           has successfully completed <br/> the course in 
//                             ${course}
//                       </div>
//                       <span>
//                       <img src="
//                       data:${logoMimeType2};base64,${logoBase642}  " alt="">
//                       </span>
//                       <p>
//                       <img class="logo" src=" data:${logoMimeType}; base64,${logoBase64}" alt="Logo">
//                       </p>
//                       <div class="sign">
//                       <img src="data:${logoMimetype3}; base64, ${logoBase64S}" alt="">
//                       <legend>Director</legend>
//                   </div>

//                   <div class="venu">
//                       Venu: Online
//                       <br>
//                       2x5rvhf6
//                   </div>
//                   </div>
//                   <h6>visit https://ogenduacademy.com/certificate/user/auth   to verify the authenticity of this certificate</h6>


//                   </div>
//               </body>

//               </html>`;


//               const options = [
//                 '--pageSize', 'A4', // Set the page size to A4
//                 // Add any additional options here if needed
//               ];

//     wkhtmltopdf(html, options, (err, pdfStream) => {
//       if (err) {
//         console.error('Certificate generation error:', err);
//         res.status(500).send('Certificate generation error');
//       } else {
//         res.set({
//           'Content-Type': 'application/pdf',
//           'Content-Disposition': 'attachment; filename="certificate.pdf"',
//         });
//         pdfStream.pipe(res); // Send the generated PDF as the response to the client.
//       }
//     });
//   } catch (error) {
//     console.error('Certificate generation error:', error);
//     res.status(500).send('Certificate generation error');
//   }
// });



router.post('/generate-certificate', async (req, res) => {
    console.log('i got a single email from the frontend');
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: 'You are not a registered member' });
        }

        const allUserSeminars = user.registeredSeminars.map(seminar => new mongoose.Types.ObjectId(seminar.toString()));
        const allSeminars = await Seminar.find({ _id: { $in: allUserSeminars } });

        res.json({ allSeminars });
    } catch (error) {
        console.error('Error generating certificate:', error);
        res.status(500).json({ message: 'Error generating certificate' });
    }
});











module.exports = router;
