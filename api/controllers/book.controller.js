import Book from '../models/book.model.js'
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vexobyte8@gmail.com',
    pass: 'sqzfncwlgczighgv',
  },
  tls: {
    rejectUnauthorized: false, // Add this line
  },
});
export const sendApp = async (req, res) => {
    try {
      const { userId, cartItems, booking_date ,emailAddress } = req.body;
  
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: 'CartItems are required' });
      }
  
      // Extract details from cartItems
      const formattedCartItems = cartItems.map((item) => ({
        productName: item.productName,
        price: item.price,
        img: item.img,
      }));
  
      const newBooking = new Book({
        userId,
        cartItems: formattedCartItems, // Save full details instead of just IDs
        booking_date,
        emailAddress
      });

  
      await newBooking.save();
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthsOfYear = [
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];
      
        const dayOfWeek = daysOfWeek[date.getDay()];
        const month = monthsOfYear[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
      
        return `${dayOfWeek} ${month} ${day}, ${year}`;
      };
      
      // Usage in your email template
      const formattedBookingDate = formatDate(booking_date);
      const emailHTML = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              color: #333;
            }
            .product-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-top: 20px;
            }
            .product-item {
              background-color: #f9f9f9;
              padding: 10px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            .product-item img {
              width: 100px;
              height: 100px;
              object-fit: cover;
              border-radius: 8px;
            }
            .product-item p {
              margin: 5px 0;
              font-size: 14px;
            }
            .total-price {
              margin-top: 20px;
              font-weight: bold;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 12px;
              color: #777;
            }
            .date {
              margin-top: 20px;
              font-size: 16px;
              font-weight: bold;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Appointment Confirmation</h1>
              <p>Thank you for booking with us! Here are the details of your appointment:</p>
            </div>
            <div class="product-grid">
              ${formattedCartItems
                .map(
                  (item) => `
                    <div class="product-item">
                      <img src="${item.img}" alt="${item.productName}" />
                      <p><strong>${item.productName}</strong></p>
                      <p>Price: ${item.price.toFixed(2)}DA</p>
                    </div>`
                )
                .join('')}
            </div>
            <div class="total-price">
              <p>Total Price: ${formattedCartItems
                .reduce((total, item) => total + item.price, 0)
                .toFixed(2)}DA</p>
            </div>
            <div class="date">
<p>Your appointment date: ${formattedBookingDate}</p>
            </div>
            <div class="footer">
              <p>If you have any questions, feel free to reach out to us.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send the email
    const mailOptions = {
      from: "vexobyte8@gmail.com",
      to: emailAddress,
      subject: 'Your Appointment Confirmation',
      html: emailHTML, // Include the HTML template
    };

    await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Appointment booked successfully!', booking: newBooking });
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ error: 'Failed to create appointment' });
    }
  };
  


  

  export const getApp = async (req, res) => {
    try {
      // Fetch all appointments
      const appointments = await Book.find().populate('userId', 'emailAddress'); // Optional: You can populate user info like email, etc.
  
      if (appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found' });
      }
  
      // Return the appointments as a response
      res.status(200).json({ appointments });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  };