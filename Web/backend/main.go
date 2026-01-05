package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"time"
	"virtuallab/config"
	"virtuallab/models"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
)

type FrontendRequest struct {
	Code string `json:"code"`
}

type Config struct {
	ClientId     string
	ClientSecret string
}

var cfg Config

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	cfg = Config{
		ClientId:     os.Getenv("COMPILER_ID"),
		ClientSecret: os.Getenv("COMPILER_KEY"),
	}
}

type JDoodleRequest struct {
	ClientId     string `json:"clientId"`
	ClientSecret string `json:"clientSecret"`
	Script       string `json:"script"`
	Language     string `json:"language"`
	VersionIndex string `json:"versionIndex"`
}

// isemailvalid checks if email matches email format
func isemailvalid(email string) bool {
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	return emailRegex.MatchString(email)
}

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func serveStaticFile(filename string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		http.ServeFile(w, r, "../"+filename)
	}
}

func serveStaticFileCourse(filename string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		http.ServeFile(w, r, "../course/"+filename)
	}
}

func executeHandler(w http.ResponseWriter, r *http.Request) {
	// Enable CORS so your frontend can talk to this backend
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		return
	}

	// 1. Parse code from your Frontend
	var feReq FrontendRequest
	if err := json.NewDecoder(r.Body).Decode(&feReq); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// 2. Prepare JDoodle Payload
	jDoodleData := JDoodleRequest{
		ClientId:     cfg.ClientId,
		ClientSecret: cfg.ClientSecret,
		Script:       feReq.Code,
		Language:     "python3",
		VersionIndex: "4",
	}

	jsonData, _ := json.Marshal(jDoodleData)

	// 3. Post to JDoodle
	resp, err := http.Post("https://api.jdoodle.com/v1/execute", "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		http.Error(w, "Failed to connect to Compiler API", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// 4. Forward JDoodle's response back to your Frontend
	w.Header().Set("Content-Type", "application/json")
	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)
	json.NewEncoder(w).Encode(result)
}

func main() {

	config.ConnectDB()

	http.HandleFunc("/api/execute", enableCORS(executeHandler))

	http.HandleFunc("/api/login", enableCORS(login))
	http.HandleFunc("/api/logout", enableCORS(logout))
	http.HandleFunc("/api/protected", enableCORS(protected))
	http.HandleFunc("/api/register", enableCORS(register))

	// Page Routes
	http.HandleFunc("/", serveStaticFile("index.html"))
	http.HandleFunc("/home", serveStaticFile("index.html"))
	http.HandleFunc("/login", serveStaticFile("login.html"))
	http.HandleFunc("/register", serveStaticFile("register.html"))
	http.HandleFunc("/course", serveStaticFile("course.html"))
	http.HandleFunc("/simulation", serveStaticFile("simulation.html"))
	http.HandleFunc("/contact", serveStaticFile("contact.html"))
	http.HandleFunc("/about", serveStaticFile("about.html"))

	http.HandleFunc("/course/arithmetic", serveStaticFileCourse("arithmetic.html"))
	http.HandleFunc("/course/array", serveStaticFileCourse("array.html"))
	http.HandleFunc("/course/looping", serveStaticFileCourse("looping.html"))
	http.HandleFunc("/course/printing", serveStaticFileCourse("printing.html"))

	// Static Assets
	fs := http.FileServer(http.Dir("assets"))
	http.Handle("/assets/", http.StripPrefix("/assets/", fs))

	fmt.Println("Server starting on port: 8000")
	if err := http.ListenAndServe(":8000", nil); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}

func register(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		er := http.StatusMethodNotAllowed
		http.Error(w, "Invalid Method", er)
		return
	}

	username := r.FormValue("username")
	email := r.FormValue("email")
	password := r.FormValue("password")

	// Validate input
	if !isemailvalid(email) || len(password) < 8 || len(username) < 3 {
		er := http.StatusNotAcceptable
		http.Error(w, "Invalid username/email/password. Username must be at least 3 characters and password at least 8 characters.", er)
		return
	}

	// Check for existing email
	existingUser, _ := models.FindUserByEmail(email, config.DB)
	if existingUser != nil {
		er := http.StatusConflict
		http.Error(w, "Email already registered", er)
		return
	}

	// Check for existing username
	existingUser, _ = models.FindUserByUsername(username, config.DB)
	if existingUser != nil {
		er := http.StatusConflict
		http.Error(w, "Username already taken", er)
		return
	}

	hashedPassword, err := hashPassword(password)
	if err != nil {
		http.Error(w, "Error processing request", http.StatusInternalServerError)
		return
	}

	// Create and save new user
	user := &models.User{
		Username:       username,
		Email:          email,
		HashedPassword: hashedPassword,
	}

	if err := user.Save(config.DB); err != nil {
		http.Error(w, "Error creating user", http.StatusInternalServerError)
		return
	}

	// Generate session tokens
	sessionToken := generateToken(32)
	csrfToken := generateToken(32)

	// Update user session
	err = models.UpdateUserSession(user.ID, sessionToken, csrfToken, config.DB)
	if err != nil {
		http.Error(w, "Error creating session", http.StatusInternalServerError)
		return
	}

	// Set session cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    csrfToken,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: false,
	})

	// Return success response with user information
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{"message": "User registered and logged in successfully", "username": "%s"}`, username)
}

func login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		er := http.StatusMethodNotAllowed
		http.Error(w, "Invalid request method", er)
		return
	}

	email := r.FormValue("email")
	password := r.FormValue("password")

	user, err := models.FindUserByEmail(email, config.DB)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		} else {
			http.Error(w, "Error processing request", http.StatusInternalServerError)
		}
		return
	}

	if !checkPasswordHash(password, user.HashedPassword) {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	sessionToken := generateToken(32)
	csrfToken := generateToken(32)

	err = models.UpdateUserSession(user.ID, sessionToken, csrfToken, config.DB)
	if err != nil {
		http.Error(w, "Error processing request", http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    csrfToken,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: false,
	})

	fmt.Fprintln(w, "Login Successful")
}

func logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: true,
	})

	http.SetCookie(w, &http.Cookie{
		Name:     "csrf_token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: false,
	})

	email := r.FormValue("email")
	user, err := models.FindUserByEmail(email, config.DB)
	if err != nil {
		http.Error(w, "Error processing request", http.StatusInternalServerError)
		return
	}

	err = models.UpdateUserSession(user.ID, "", "", config.DB)
	if err != nil {
		http.Error(w, "Error processing request", http.StatusInternalServerError)
		return
	}

	fmt.Fprintln(w, "Logged Out Success")
}

func protected(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		er := http.StatusMethodNotAllowed
		http.Error(w, "Invalid request method", er)
		return
	}

	if err := Authorize(r); err != nil {
		er := http.StatusUnauthorized
		http.Error(w, "Unauthorized", er)
		return
	}

	fmt.Fprintf(w, "CSRF validation Successful!")
}
