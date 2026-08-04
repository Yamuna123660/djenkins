<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configure Tickets - <%= bus.name %></title>
    <link href="https://jsdelivr.net" rel="stylesheet">
</head>
<body class="bg-gray-50 text-gray-900 font-sans min-h-screen flex flex-col">

    <nav class="bg-blue-600 text-white p-4 shadow-sm">
        <div class="max-w-4xl mx-auto flex items-center">
            <a href="/" class="text-blue-200 hover:text-white mr-4 transition">← Back</a>
            <h1 class="text-xl font-bold">Secure Passenger Reservation</h1>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-10 px-4 flex-grow w-full">
        
        <!-- Left Column: Bus Seat Layout Mapping Visual -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 class="text-lg font-bold text-gray-800 mb-2">Interactive Deck Layout</h2>
            <p class="text-xs text-gray-500 mb-6">Select one seat from the available spaces below.</p>
            
            <div class="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 max-w-xs mx-auto">
                <div class="flex justify-end mb-8">
                    <!-- Steering Wheel Icon/Label Representing Front of Bus -->
                    <div class="bg-gray-300 text-gray-600 text-xs px-3 py-1 rounded font-bold uppercase tracking-wider shadow-sm">⚡ Driver</div>
                </div>
                
                <div class="grid grid-cols-4 gap-3 text-center">
                    <% for(let i = 1; i <= 16; i++) { %>
                        <% let isAvailable = bus.availableSeats.includes(i); %>
                        <% if(isAvailable) { %>
                            <button type="button" onclick="selectSeat('<%= i %>')" id="seat-btn-<%= i %>" class="seat-option p-2 bg-white border-2 border-blue-500 text-blue-600 rounded-md font-semibold text-sm hover:bg-blue-50 transition shadow-sm">
                                <%= i %>
                            </button>
                        <% } else { %>
                            <div class="p-2 bg-gray-200 text-gray-400 border border-gray-300 rounded-md text-sm cursor-not-allowed font-medium shadow-inner">
                                <%= i %>
                            </div>
                        <% } %>
                    <% } %>
                </div>
            </div>
            
            <!-- Map Legend Indicators -->
            <div class="flex justify-center space-x-6 text-xs font-semibold text-gray-600 mt-6 bg-gray-50 p-2 rounded-lg">
                <div class="flex items-center space-x-1"><span class="w-3 h-3 bg-white border border-blue-500 rounded"></span> <span>Available</span></div>
                <div class="flex items-center space-x-1"><span class="w-3 h-3 bg-blue-600 rounded"></span> <span>Selected</span></div>
                <div class="flex items-center space-x-1"><span class="w-3 h-3 bg-gray-200 rounded"></span> <span>Taken</span></div>
            </div>
        </div>

        <!-- Right Column: Form Booking Fields -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
            <div>
                <h2 class="text-lg font-bold text-gray-800 mb-1">Reservation Specs</h2>
                <p class="text-sm text-blue-600 font-medium mb-6"><%= bus.name %> • <%= bus.type %></p>
                
                <form action="/confirm-booking" method="POST" id="bookingForm" class="space-y-5">
                    <input type="hidden" name="busId" value="<%= bus.id %>">
                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Passenger Full Name</label>
                        <input type="text" name="passengerName" required placeholder="John Doe" class="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Chosen Seat Number</label>
                        <input type="text" name="selectedSeat" id="selectedSeatInput" readonly placeholder="Click a layout seat left" required class="w-full bg-gray-100 border border-gray-300 text-blue-700 font-bold rounded-lg px-4 py-2.5 cursor-not-allowed focus:outline-none">
                    </div>

                    <div class="bg-blue-50 rounded-xl p-4 border border-blue-100 space-y-2 text-sm text-gray-700">
                        <div class="flex justify-between font-semibold text-gray-900 border-b border-blue-200 pb-2">
                            <span>Fare Subtotal:</span>
                            <span class="text-base text-gray-900">$<%= bus.price %></span>
                        </div>
                        <p class="text-xs text-gray-500 pt-1">Fares are all-inclusive of standard local terminal facility tariffs.</p>
                    </div>

                    <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow transition duration-150">Complete Secure Reservation</button>
                </form>
            </div>
        </div>
    </main>

    <script>
        // Interactive UI Function handling clean local toggles for active seat state switching
        function selectSeat(seatNumber) {
            document.getElementById('selectedSeatInput').value = seatNumber;
            
            // Revert colors of all other active option configurations
            document.querySelectorAll('.seat-option').forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white', 'hover:bg-blue-700');
                btn.classList.add('bg-white', 'text-blue-600', 'hover:bg-blue-50');
            });

            // Target current highlighted selection mapping
            const selectedBtn = document.getElementById(`seat-btn-${seatNumber}`);
            selectedBtn.classList.remove('bg-white', 'text-blue-600', 'hover:bg-blue-50');
            selectedBtn.classList.add('bg-blue-600', 'text-white', 'hover:bg-blue-700');
        }
    </script>
</body>
</html>

