<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bus Ticket Booking</title>
    <!-- Tailwind CSS CDN for high fidelity styling -->
    <link href="https://jsdelivr.net" rel="stylesheet">
</head>
<body class="bg-gray-50 text-gray-900 font-sans">

    <!-- Header Navigation -->
    <nav class="bg-blue-600 text-white shadow-md p-4">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold tracking-tight">🚌 TransitGo</h1>
            <span class="text-sm bg-blue-700 px-3 py-1 rounded-full">Secure Booking</span>
        </div>
    </nav>

    <!-- Search Form Hero Section -->
    <header class="bg-gradient-to-r from-blue-600 to-indigo-700 py-12 px-4 shadow-inner text-white">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-extrabold mb-2">Find Your Next Ride</h2>
            <p class="text-blue-100 mb-8">Compare schedules, choose layouts, and reserve instantly.</p>
            
            <form action="/" method="GET" class="bg-white text-gray-800 p-6 rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">From</label>
                    <input type="text" name="from" value="<%= from %>" required placeholder="Leaving from" class="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">To</label>
                    <input type="text" name="to" value="<%= to %>" required placeholder="Going to" class="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date</label>
                    <input type="date" name="date" value="<%= date %>" required class="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                </div>
                <div class="flex items-end">
                    <button type="submit" class="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg shadow transition duration-150">Search Buses</button>
                </div>
            </form>
        </div>
    </header>

    <!-- Search Results Grid -->
    <main class="max-w-4xl mx-auto py-10 px-4">
        <% if (buses && buses.length > 0) { %>
            <h3 class="text-xl font-bold text-gray-800 mb-6">Available Journeys from <span class="text-blue-600"><%= from %></span> to <span class="text-blue-600"><%= to %></span></h3>
            <div class="space-y-4">
                <% buses.forEach(bus => { %>
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:shadow-md">
                        <div class="space-y-1">
                            <span class="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium"><%= bus.type %></span>
                            <h4 class="text-lg font-bold text-gray-900 pt-1"><%= bus.name %></h4>
                            <div class="flex items-center space-x-4 text-sm text-gray-500 pt-1">
                                <span>🕒 Departs: <strong class="text-gray-800"><%= bus.departure %></strong></span>
                                <span>🏁 Arrives: <strong class="text-gray-800"><%= bus.arrival %></strong></span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                            <div class="text-left md:text-right">
                                <p class="text-2xl font-black text-gray-900">$<%= bus.price %></p>
                                <p class="text-xs text-green-600 font-medium"><%= bus.availableSeats.length %> seats left</p>
                            </div>
                            <a href="/book/<%= bus.id %>" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm transition">Select Seats</a>
                        </div>
                    </div>
                <% }) %>
            </div>
        <% } else if (buses !== null) { %>
            <div class="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                <p class="text-gray-500 text-lg">No buses found for this specified route and date criteria.</p>
            </div>
        <% } else { %>
            <div class="text-center py-12 bg-blue-50 border border-blue-100 rounded-xl">
                <p class="text-blue-700">Enter your travel routes above to check dynamic booking slots.</p>
            </div>
        <% } %>
    </main>

</body>
</html>

