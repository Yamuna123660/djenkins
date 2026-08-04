const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); // Parses form submissions

// Mock Data for Buses
const buses = [
    { id: 1, name: "City Express", departure: "08:00 AM", arrival: "12:00 PM", price: 25, type: "AC Seater", availableSeats: [1, 2, 5, 6, 9, 10, 14, 15] },
    { id: 2, name: "Royal Travels", departure: "02:30 PM", arrival: "07:00 PM", price: 40, type: "Luxury Sleeper", availableSeats: [3, 4, 7, 8, 11, 12] },
    { id: 3, name: "Night Rider", departure: "10:00 PM", arrival: "04:30 AM", price: 30, type: "Non-AC Sleeper", availableSeats: [1, 2, 3, 4, 13, 14, 15, 16] }
];

// Route 1: Main Search Page
app.get('/', (req, res) => {
    const { from, to, date } = req.query;
    let searchResults = null;

    // Simulate search filter if fields are filled
    if (from && to && date) {
        searchResults = buses; 
    }

    res.render('index', { 
        from: from || '', 
        to: to || '', 
        date: date || '', 
        buses: searchResults 
    });
});

// Route 2: Seat Selection and Passenger Details Form
app.get('/book/:id', (req, res) => {
    const busId = parseInt(req.params.id);
    const bus = buses.find(b => b.id === busId);

    if (!bus) {
        return res.status(404).send("Bus not found");
    }

    res.render('book', { bus });
});

// Route 3: Handle Booking Confirmation
app.post('/confirm-booking', (req, res) => {
    const { busId, passengerName, selectedSeat } = req.body;
    const bus = buses.find(b => b.id === parseInt(busId));

    if (!bus) {
        return res.status(400).send("Invalid Booking Request");
    }

    // Server-side confirmation message
    res.send(`
        <link href="https://jsdelivr.net" rel="stylesheet">
        <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-green-500">
                <div class="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
                <h1 class="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
                <p class="text-gray-600 mb-6">Thank you for booking with us, <strong class="text-gray-900">${passengerName}</strong>.</p>
                <div class="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-700 space-y-2 mb-6">
                    <p><strong>Bus:</strong> ${bus.name} (${bus.type})</p>
                    <p><strong>Seat Assigned:</strong> Seat #${selectedSeat}</p>
                    <p><strong>Departure:</strong> ${bus.departure}</p>
                    <p><strong>Total Paid:</strong> $${bus.price}</p>
                </div>
                <a href="/" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition">Book Another Ticket</a>
            </div>
        </div>
    `);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

