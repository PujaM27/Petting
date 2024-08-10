// Sample data for pets (you can replace this with API or backend data)
const pets = [
    { id: 1, name: "Fluffy", age: "2 Years", breed: "Unknown but Cutie", description: "A cuddly and loving companion.", image: "assets/images/cat1.jpg" },
    { id: 2, name: "Pookie", age: "1 Year", breed: "Homely", description: "A playful and curious little one.", image: "assets/images/cat2.jpg" },
    { id: 3, name: "Cutie", age: "1 Year", breed: "Beauty", description: "A sweet and charming furball.", image: "assets/images/cat3.jpg" },
    { id: 4, name: "Butter", age: "2 Years", breed: "Pure Indian", description: "A friendly and loyal companion.", image: "assets/images/dog1.jpg" },
    { id: 5, name: "Musky", age: "2 Years", breed: "Lonely but Warm", description: "A gentle and warm-hearted soul.", image: "assets/images/dog2.jpg" },
    { id: 6, name: "Toothsy", age: "2 Years", breed: "Happyland", description: "Always happy and ready to play.", image: "assets/images/dog3.jpg" },
];

// Get the `id` parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const petId = parseInt(urlParams.get("id"));

// Find the pet based on the `id`
const pet = pets.find(p => p.id === petId);

// Populate pet details
if (pet) {
    document.getElementById("pet-image").src = pet.image;
    document.getElementById("pet-name").textContent = pet.name;
    document.getElementById("pet-age").textContent = `Age: ${pet.age}`;
    document.getElementById("pet-breed").textContent = `Breed: ${pet.breed}`;
    document.getElementById("pet-description").textContent = `Description: ${pet.description}`;
} else {
    document.body.innerHTML = "<p>Pet not found. Please go back and try again.</p>";
}
