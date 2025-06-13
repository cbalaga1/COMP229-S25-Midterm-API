# Midterm API Project - COMP229 Summer 2025

## Project Overview
Your mission, should you choose to accept it, is to implement the missing logic for managing a collection of movies via an API. The server is already set up and running on port `3000`, with an array of movies ready for you to manipulate.

### Endpoints:
1. **GET /api/movies** - Retrieve the full list of movies.
2. **GET /api/movies/filter?genre=[genre name]** - Retrieve movies by genre match.
3. **GET /api/movies/:id** - Retrieve a movie by its index (ID).
4. **POST /api/movies** - Add a new movie to the collection.
5. **PUT /api/movies/:id** - Update a movie by its index (ID).
6. **DELETE /api/movies/:id** - Remove a movie from the collection by its index (ID).

The array of movies is already defined for you in the `server.js` file, but **you need to implement the logic** for each API endpoint.

### Array Example:

Below is an example of the array you'll be working with:

![Array Example](public/images/array-example.jpg)

---

## **IMPORTANT: Personalized Requirements**

### **You MUST personalize your movie collection based on your Student ID:**

**Each student must add 2 additional movies to the initial array based on the last digit of their student ID:**

- **If your student ID ends in 0-1:** Add 2 movies from **1990-1999**
- **If your student ID ends in 2-3:** Add 2 movies from **2000-2009**  
- **If your student ID ends in 4-5:** Add 2 movies from **2010-2019**
- **If your student ID ends in 6-7:** Add 2 movies from **2020-2024**
- **If your student ID ends in 8-9:** Add 2 **animated/cartoon** movies (any year)

**Example:** If your student ID is `301234567` (ends in 7), you must add 2 movies from 2020-2024.

### **Format for your additional movies:**
```javascript
{ title: 'Your Movie Title', genre: 'Genre', year: YYYY, director: 'Director Name' }
```

### **Screenshot Requirement:** 
You must include a **screenshot of your personalized movie array** showing all 7 movies (5 original + 2 your additions) in one of your API test responses.

---

## Setup Instructions

1. **Clone the repository from GitHub**  
   Link to repository: `https://github.com/CENT-COL/COMP229-S25-MIDTERM`

2. **Install dependencies**  
   Run the following command in the root folder to install necessary Node.js packages:
   ```bash
   npm install
   ```

3. **Run the server**  
   Start the server by running:
   ```bash
   npm start
   ```

   The server will be running on port `3000`.

4. **Test the API**  
   Use API testing tools like Postman, Thunder Client, or similar to test your API implementation. You should:
   - Make a request to each API endpoint.
   - Provide the necessary request body where applicable (for POST and PUT).
   - Capture the successful response in a screenshot.

---

## Submission Requirements

1. **Screenshots**  
   Provide **clear screenshots** of your API tests, showing the following:
   - There should be **1 screenshot per Endpoint (6 in total)**
   - The API request URL and method.
   - The request body (where applicable).
   - The successful response with proper HTTP status codes.
   - **At least one screenshot must show your complete personalized movie array (7 movies total)**
   
   You can use Postman, Thunder Client, Insomnia, or another similar API testing tool.
   
   ### **Screenshot Naming Convention:**
   Name your screenshots as: `[StudentID]_[LastName]_[EndpointNumber]_[Method].png`
   
   Example: `301234567_Smith_01_GET_ALL.png`

   ### Postman Test Example:

    Here's an example of what your Postman test should look like when successfully testing your API:

    ![Postman Example](public/images/postman-example.jpg)

2. **Code Submission**  
   - Include your code in a **.zip** file.
   - Provide a **GitHub link** to your repository containing the project.
   - Make sure all screenshots are clearly visible and organized in your submission.
   - **Your movie array must contain your 2 personalized additions based on your student ID**

---

## **Academic Integrity Notice**

⚠️ **WARNING:** Your submission will be checked for:
- Correct personalized movie additions matching your student ID pattern
- Screenshot naming convention compliance
- Unique movie choices (identical movie selections will be flagged)

Submissions with missing personalized content or suspicious similarities will be reviewed for academic integrity violations.

---

## Good luck!
Remember, write clean code, validate your inputs, and handle errors gracefully. May your code be bug-free!


