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

	// Initialize Tiny Slider for Aqua Fitness
	if (document.getElementById("fitnessSlider")) {
		const slider = tns({
			container: "#fitnessSlider",
			items: 1,
			slideBy: 1,
			autoplay: false,
			controls: true,
			nav: true,
			controlsContainer: ".slider-nav",
			prevButton: ".prev-btn",
			nextButton: ".next-btn",
			autoplayButtonOutput: false,
			responsive: {
				768: {
					items: 1,
				},
			},
		});
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
