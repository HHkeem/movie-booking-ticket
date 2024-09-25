const movies = [
    {
        title: "Avengers: Endgame",
        availableSeats: 48,
        price: 35.000,
        poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        description: "After the devastating events of Avengers: Infinity War, the universe is in ruins.",
        showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
        seats: Array(100).fill(true) // Initially, all seats are available
    },
    {
        title: "Joker",
        availableSeats: 34,
        price: 45.000,
        poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated.",
        showtimes: ["11:00 AM", "2:00 PM", "5:00 PM"],
        seats: Array(80).fill(true) // Initially, all seats are available
    },
    {
        title: "Toy Story 4",
        availableSeats: 58,
        price: 30.000,
        poster: "https://image.tmdb.org/t/p/w500/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg",
        description: "When Woody, Buzz, and the gang set out on a road trip with Bonnie, they meet a new toy named Forky.",
        showtimes: ["12:00 PM", "3:00 PM", "6:00 PM"],
        seats: Array(120).fill(true) // Initially, all seats are available
    },

    {
        title: "Finding Nemo",
        availableSeats: 75,
        price: 7.5,
        poster: "https://www.themoviedb.org/t/p/w500/4K8U0qDoXNe2p8xG8BQ84EOovY1.jpg", // Updated poster link
        description: "A clown fish named Marlin sets out to find his abducted son, Nemo, who is captured by a diver.",
        showtimes: ["12:00 PM", "3:00 PM", "6:00 PM"],
        seats: Array(75).fill(true)
    },
    {
        title: "Spider-Man: Into the Spider-Verse",
        availableSeats: 50,
        price: 8,
        poster: "https://www.themoviedb.org/t/p/w500/3mXStpH7ZzU38UMV9b4mZ3A6cQz.jpg", // Updated poster link
        description: "Teen Miles Morales becomes the Spider-Man of his universe and must join with his counterparts from other dimensions to stop a threat to all realities.",
        showtimes: ["10:30 AM", "1:30 PM", "4:30 PM"],
        seats: Array(50).fill(true)
    },
        // ... other movie objects ...
    
];

let tickets = {};
let selectedSeats = [];
let selectedShowtime = "";

// Show available movies
function showMovies() {
    const moviesList = document.getElementById("movies-list");
    movies.forEach((movie, index) => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");
        movieItem.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" style="width:100%; border-radius: 5px;">
            <h4>${movie.title}</h4>
            <button onclick="viewMovieDetails(${index})">View Details</button>
        `;
        moviesList.appendChild(movieItem);
    });
}

// Login function
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Simple authentication (for demo purposes)
    if (username && password) {
        localStorage.setItem("loggedInUser", username);
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("movie-section").style.display = "block";
    } else {
        alert("Please enter both username and password.");
    }
}

// Register function
function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    // Simple registration (for demo purposes)
    if (username && password) {
        alert("Registration successful!");
        toggleForm();
    } else {
        alert("Please enter both username and password.");
    }
}

// Toggle between login and register forms
function toggleForm() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    document.getElementById("movie-section").style.display = "none";
    document.getElementById("auth-section").style.display = "block";
}

// View movie details and select showtime
function viewMovieDetails(movieIndex) {
    const movie = movies[movieIndex];
    const movieDetailsSection = document.getElementById("movie-details-section");
    const movieTitle = document.getElementById("movie-title");
    const moviePoster = document.getElementById("movie-poster");
    const movieDescription = document.getElementById("movie-description");
    const showtimeSelection = document.getElementById("showtime-selection");
    const seatSelection = document.getElementById("seat-selection");

    movieTitle.innerText = movie.title;
    moviePoster.src = movie.poster;
    movieDescription.innerText = movie.description;

    // Create showtime buttons
    showtimeSelection.innerHTML = "";
    movie.showtimes.forEach((showtime) => {
        const button = document.createElement("button");
        button.innerText = showtime;
        button.onclick = () => selectShowtime(showtime, movie);
        showtimeSelection.appendChild(button);
    });

    // Display seat selection
    seatSelection.innerHTML = "";
    for (let i = 0; i < movie.seats.length; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.innerText = (i + 1);
        seat.onclick = () => toggleSeatSelection(i, movie);
        if (!movie.seats[i]) {
            seat.classList.add("unavailable");
            seat.onclick = null; // Disable click for unavailable seats
        }
        seatSelection.appendChild(seat);
    }

    movieDetailsSection.style.display = "block";
    document.getElementById("movie-section").style.display = "none";
}

// Select showtime
function selectShowtime(showtime, movie) {
    selectedShowtime = showtime;
    const seatSelection = document.getElementById("seat-selection");
    seatSelection.style.display = "grid";
    document.getElementById("book-ticket-btn").style.display = "block";
}

// Toggle seat selection
function toggleSeatSelection(seatIndex, movie) {
    const seat = document.querySelectorAll(".seat")[seatIndex];

    if (selectedSeats.includes(seatIndex)) {
        selectedSeats = selectedSeats.filter(seat => seat !== seatIndex); // Deselect seat
        seat.classList.remove("selected");
    } else {
        selectedSeats.push(seatIndex); // Select seat
        seat.classList.add("selected");
    }

    document.getElementById("book-ticket-btn").style.display = selectedSeats.length > 0 ? "block" : "none";
}

// Book a ticket with selected seats
function bookTicket() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const ticketCount = selectedSeats.length;

    if (ticketCount > 0) {
        const movieIndex = movies.findIndex(movie => movie.title === document.getElementById("movie-title").innerText);
        const movie = movies[movieIndex];

        // Update seat availability
        selectedSeats.forEach(seatIndex => {
            movie.seats[seatIndex] = false; // Mark seat as unavailable
        });

        // Store tickets in localStorage for the logged-in user
        if (!tickets[loggedInUser]) {
            tickets[loggedInUser] = [];
        }

        const existingTicket = tickets[loggedInUser].find(ticket => ticket.movieIndex === movieIndex && ticket.showtime === selectedShowtime);
        if (existingTicket) {
            existingTicket.numberOfTickets += ticketCount;
            existingTicket.seats.push(...selectedSeats);
        } else {
            tickets[loggedInUser].push({ movieIndex, numberOfTickets: ticketCount, showtime: selectedShowtime, seats: selectedSeats });
        }

        localStorage.setItem("tickets", JSON.stringify(tickets));
        alert(`Successfully booked ${ticketCount} tickets for ${movie.title} at ${selectedShowtime}.\nSeats: ${selectedSeats.map(seat => seat + 1).join(", ")}`);
        viewTickets(); // Show tickets after booking
    } else {
        alert("Please select seats before booking.");
    }
}

// Edit a ticket
function editTicket(ticketIndex) {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const newTicketCount = parseInt(document.getElementById(`edit-tickets-${ticketIndex}`).value);

    if (isNaN(newTicketCount) || newTicketCount <= 0) {
        alert("Please enter a valid ticket count.");
        return;
    }

    const ticket = tickets[loggedInUser][ticketIndex];
    const movie = movies[ticket.movieIndex];

    // Check if there are enough seats available
    const availableSeats = movie.seats.filter(seat => seat === true).length + ticket.numberOfTickets;
    if (newTicketCount > availableSeats) {
        alert(`You can only change to a maximum of ${availableSeats} tickets.`);
        return;
    }

    ticket.numberOfTickets = newTicketCount; // Update ticket count
    localStorage.setItem("tickets", JSON.stringify(tickets));
    alert("Ticket count updated successfully.");
    viewTickets(); // Refresh ticket view
}

// Cancel a ticket
function cancelTicket(ticketIndex) {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const ticket = tickets[loggedInUser][ticketIndex];
    const movie = movies[ticket.movieIndex];

    // Release the seats back to available
    ticket.seats.forEach(seatIndex => {
        movie.seats[seatIndex] = true; // Mark seat as available
    });

    // Remove the ticket from the list
    tickets[loggedInUser].splice(ticketIndex, 1);
    if (tickets[loggedInUser].length === 0) {
        delete tickets[loggedInUser];
    }

    localStorage.setItem("tickets", JSON.stringify(tickets));
    alert("Ticket canceled successfully.");
    viewTickets(); // Refresh ticket view
}

// View purchased tickets
function viewTickets() {
    const movieSection = document.getElementById("movie-section");
    const ticketsSection = document.getElementById("tickets-section");
    const myTicketsList = document.getElementById("my-tickets-list");

    movieSection.style.display = "none";
    ticketsSection.style.display = "block";

    const loggedInUser = localStorage.getItem("loggedInUser");
    myTicketsList.innerHTML = ""; // Clear list

    if (tickets[loggedInUser] && tickets[loggedInUser].length > 0) {
        tickets[loggedInUser].forEach((ticket, index) => {
            const movie = movies[ticket.movieIndex];
            const ticketItem = document.createElement("div");
            ticketItem.innerHTML = `
                <p>${movie.title} - Showtime: ${ticket.showtime} - Tickets: ${ticket.numberOfTickets} - Seats: ${ticket.seats.map(seat => seat + 1).join(", ")}</p>
                <input type="number" id="edit-tickets-${index}" value="${ticket.numberOfTickets}" />
                <button onclick="editTicket(${index})">Edit</button>
                <button onclick="cancelTicket(${index})">Cancel</button>
            `;
            myTicketsList.appendChild(ticketItem);
        });
    } else {
        myTicketsList.innerHTML = "<p>No tickets booked yet.</p>";
    }
}

// Go back to movie selection
function goBack() {
    document.getElementById("tickets-section").style.display = "none";
    document.getElementById("movie-section").style.display = "block";
}

// Go back to movies
function goBackToMovies() {
    document.getElementById("movie-details-section").style.display = "none";
    document.getElementById("movie-section").style.display = "block";
}

// Search movies
function searchMovies() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    const moviesList = document.getElementById("movies-list");
    moviesList.innerHTML = ""; // Clear current movies

    movies.forEach((movie, index) => {
        if (movie.title.toLowerCase().includes(searchTerm)) {
            const movieItem = document.createElement("div");
            movieItem.classList.add("movie-item");
            movieItem.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" style="width:100%; border-radius: 5px;">
                <h4>${movie.title}</h4>
                <button onclick="viewMovieDetails(${index})">View Details</button>
            `;
            moviesList.appendChild(movieItem);
        }
    });
}

// On page load, check if user is logged in
window.onload = function() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("movie-section").style.display = "block";
        showMovies();
    } else {
        showMovies();
    }
};
