// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
	const menuToggle = document.getElementById("menuToggle");
	const closeMenu = document.getElementById("closeMenu");
	const mobileNavContainer = document.querySelector(".mobile-nav-container");
	const body = document.body;

	// Function to toggle mobile menu
	function openMobileMenu() {
		mobileNavContainer.classList.add("active");
		body.style.overflow = "hidden";
	}

	function closeMobileMenu() {
		mobileNavContainer.classList.remove("active");
		body.style.overflow = "";
	}

	// Event listener for menu toggle
	if (menuToggle) {
		menuToggle.addEventListener("click", openMobileMenu);
	}

	// Event listener for close button
	if (closeMenu) {
		closeMenu.addEventListener("click", closeMobileMenu);
	}

	// Close menu when clicking outside
	document.addEventListener("click", function (event) {
		const isClickInsideNav = event.target.closest(".mobile-nav");
		const isClickOnToggle = event.target.closest("#menuToggle");

		if (mobileNavContainer.classList.contains("active") && !isClickInsideNav && !isClickOnToggle) {
			closeMobileMenu();
		}
	});

	// Custom slider functionality
	const slider = document.getElementById("fitnessSlider");

	if (slider) {
		const slidesContainer = slider.querySelector(".slides-container");
		const slides = slider.querySelectorAll(".slide");
		const prevBtn = document.querySelector(".prev-btn");
		const nextBtn = document.querySelector(".next-btn");
		const dotsContainer = document.querySelector(".slider-dots");

		let currentIndex = 0;
		const totalSlides = slides.length;

		// Create dots for navigation
		for (let i = 0; i < totalSlides; i++) {
			const dot = document.createElement("button");
			dot.classList.add("dot");
			dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

			if (i === 0) {
				dot.classList.add("active");
			}

			dot.addEventListener("click", () => {
				goToSlide(i);
			});

			dotsContainer.appendChild(dot);
		}

		// Functions to control the slider
		function goToSlide(index) {
			currentIndex = index;
			updateSlider();
		}

		function updateSlider() {
			// Update the transform to show the current slide
			slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

			// Update dots
			const dots = dotsContainer.querySelectorAll(".dot");
			dots.forEach((dot, index) => {
				if (index === currentIndex) {
					dot.classList.add("active");
				} else {
					dot.classList.remove("active");
				}
			});
		}

		function nextSlide() {
			currentIndex = (currentIndex + 1) % totalSlides;
			updateSlider();
		}

		function prevSlide() {
			currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
			updateSlider();
		}

		// Add event listeners
		if (prevBtn) {
			prevBtn.addEventListener("click", prevSlide);
		}

		if (nextBtn) {
			nextBtn.addEventListener("click", nextSlide);
		}

		// Auto-play (optional)
		let autoplayInterval;

		function startAutoplay() {
			autoplayInterval = setInterval(nextSlide, 5000);
		}

		function stopAutoplay() {
			clearInterval(autoplayInterval);
		}

		// Start autoplay and handle pause on user interaction
		startAutoplay();

		slider.addEventListener("mouseenter", stopAutoplay);
		slider.addEventListener("mouseleave", startAutoplay);

		// Optional: Add touch support
		let touchStartX = 0;
		let touchEndX = 0;

		slidesContainer.addEventListener(
			"touchstart",
			e => {
				touchStartX = e.changedTouches[0].screenX;
				stopAutoplay();
			},
			{passive: true}
		);

		slidesContainer.addEventListener(
			"touchend",
			e => {
				touchEndX = e.changedTouches[0].screenX;
				handleSwipe();
				startAutoplay();
			},
			{passive: true}
		);

		function handleSwipe() {
			const swipeThreshold = 50;
			if (touchEndX < touchStartX - swipeThreshold) {
				nextSlide();
			} else if (touchEndX > touchStartX + swipeThreshold) {
				prevSlide();
			}
		}
	}

	// Add active class to current page link
	const currentLocation = window.location.href;
	const navLinks = document.querySelectorAll("nav a");

	navLinks.forEach(link => {
		if (link.href === currentLocation) {
			link.classList.add("active");
		}
	});

	// Smooth scroll for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href");
			if (targetId === "#") return;

			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				targetElement.scrollIntoView({
					behavior: "smooth",
				});

				// Close mobile menu if open
				if (mobileNav.classList.contains("active")) {
					toggleMobileMenu();
				}
			}
		});
	});

	// Animate elements when they come into view
	const animateOnScroll = function () {
		const sections = document.querySelectorAll("section");

		sections.forEach(section => {
			const sectionTop = section.getBoundingClientRect().top;
			const windowHeight = window.innerHeight;

			if (sectionTop < windowHeight * 0.75) {
				section.classList.add("animate");
			}
		});
	};

	// Run once on page load
	animateOnScroll();

	// Add scroll event listener
	window.addEventListener("scroll", animateOnScroll);
});
