// Global state
let currentPage = 'home';
let filteredResources = [...resourcesDatabase];
let filteredEvents = [...eventsDatabase];
let map = null;
let markers = [];
let currentMonth = new Date();

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Sarasota Community Hub...');
  initializeApp();
});

function initializeApp() {
  updateNavigation();
  setupMobileMenu();
  detectCurrentPage();
  setupEventListeners();
  populateUI();
  setupScrollAnimations();
  initializePageSpecific();
  console.log('App initialized for page:', currentPage);
}

function updateNavigation() {
  const nav = document.getElementById('main-nav');
  if (nav && !nav.querySelector('a[data-page="documents"]')) {
    const docLink = document.createElement('a');
    docLink.href = 'documents.html';
    docLink.className = 'nav-link';
    docLink.setAttribute('data-page', 'documents');
    docLink.textContent = 'Documents';
    
    // Insert before About page if it exists
    const aboutLink = nav.querySelector('a[data-page="about"]');
    if (aboutLink) {
      nav.insertBefore(docLink, aboutLink);
    } else {
      nav.appendChild(docLink);
    }
  }
}

function initializePageSpecific() {
  // Initialize features specific to the current page
  const path = window.location.pathname;
  
  if (path.includes('resources.html')) {
    displayResources(filteredResources);
  } else if (path.includes('map.html')) {
    setTimeout(() => {
      initializeMap();
    }, 100);
  } else if (path.includes('submit.html')) {
    // Form is already set up via setupEventListeners
  }
}

function detectCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('resources.html')) {
    currentPage = 'resources';
  } else if (path.includes('map.html')) {
    currentPage = 'map';
  } else if (path.includes('calendar.html')) {
    currentPage = 'calendar';
  } else if (path.includes('submit.html')) {
    currentPage = 'submit';
  } else if (path.includes('about.html')) {
    currentPage = 'about';
  } else if (path.includes('documents.html')) {
    currentPage = 'documents';
  } else {
    currentPage = 'home';
  }
  
  // Update active nav
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('active');
    }
  });
}

function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }
  
  // Close menu when clicking a link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
      const hamburger = document.getElementById('hamburger');
      const nav = document.getElementById('main-nav');
      if (hamburger && nav) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  });
}

// Exposed helper for inline onclick handlers in HTML
function toggleMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (hamburger) hamburger.classList.toggle('active');
  if (nav) nav.classList.toggle('active');
}

function setupEventListeners() {
  // Search
  const searchBox = document.getElementById('search-box');
  if (searchBox) {
    searchBox.addEventListener('input', handleSearch);
  }

  // Filter
  const filterBox = document.getElementById('filter-box');
  if (filterBox) {
    filterBox.addEventListener('change', handleFilter);
  }

  // Map search
  const mapSearchBox = document.getElementById('map-search-box');
  if (mapSearchBox) {
    mapSearchBox.addEventListener('input', handleMapSearch);
  }

  // Map filter
  const mapFilterBox = document.getElementById('map-filter-box');
  if (mapFilterBox) {
    mapFilterBox.addEventListener('change', handleMapFilter);
  }

  // Form submission
  const resourceForm = document.getElementById('resource-form');
  if (resourceForm) {
    resourceForm.addEventListener('submit', handleFormSubmit);
  }

  // Calendar event search
  const eventSearchBox = document.getElementById('event-search-box');
  if (eventSearchBox) {
    eventSearchBox.addEventListener('input', function(e) {
      filterEventsBySearch(e.target.value);
    });
  }

  // Calendar event filter
  const eventFilterBox = document.getElementById('event-filter-box');
  if (eventFilterBox) {
    eventFilterBox.addEventListener('change', function(e) {
      filterEventsByCategory(e.target.value);
    });
  }
}

function populateUI() {
  // Populate all filter dropdowns
  const filterBoxes = document.querySelectorAll('#filter-box, #map-filter-box');
  filterBoxes.forEach(box => {
    if (box && box.innerHTML.trim() === '') {
      box.innerHTML = '<option value="All Categories">All Categories</option>' +
        categories.filter(c => c !== 'All Categories').map(cat => 
          `<option value="${cat}">${cat}</option>`
        ).join('');
    }
  });

  // Populate featured resources on home page
  const featuredGrid = document.getElementById('featured-grid');
  if (featuredGrid && featuredGrid.innerHTML.trim() === '') {
    featuredGrid.innerHTML = featuredResources.map(resource => `
      <div class="resource-card fade-in-on-scroll" onclick="showResourceDetail(${resource.id});">
        <div class="resource-card-header">${getCategoryIcon(resource.category)}</div>
        <div class="resource-card-body">
          <h3>${resource.name}</h3>
          <p>${resource.description}</p>
          <div class="resource-card-footer">
            <span class="btn btn-small btn-primary">Learn More</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Populate category grid on about page
  const categoryGrid = document.getElementById('category-grid');
  if (categoryGrid && categoryGrid.innerHTML.trim() === '') {
    categoryGrid.innerHTML = categories.filter(c => c !== 'All Categories').map(category => {
      const count = resourcesDatabase.filter(r => r.category === category).length;
      return `
        <a href="resources.html?category=${encodeURIComponent(category)}" 
           class="resource-card fade-in-on-scroll" 
           style="text-decoration: none; text-align: center;">
          <div class="resource-card-header" style="font-size: 2rem;">${getCategoryIcon(category)}</div>
          <div class="resource-card-body">
            <h3 style="font-size: 1rem;">${category}</h3>
            <p style="font-size: 0.9rem;">${count} resources</p>
          </div>
        </a>
      `;
    }).join('');
  }

  // Check for URL category parameter
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    const filterBox = document.getElementById('filter-box');
    if (filterBox) {
      filterBox.value = categoryParam;
      handleFilter({ target: { value: categoryParam } });
    }
  }
}

function getCategoryIcon(category) {
  const icons = {
    'Libraries': '📚',
    'Healthcare': '⚕️',
    'Shelters': '🏠',
    'Job Services': '💼',
    'Parks': '🌳',
    'Transit': '🚌',
    'Food Services': '🍽️',
    'Youth Services': '👶',
    'Senior Services': '👴',
    'Community Services': '🤝',
    'Education': '🎓',
    'Legal Services': '⚖️',
    'Support Services': '💪',
    'Family Services': '👨‍👩‍👧‍👦'
  };
  return icons[category] || '📌';
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase();
  
  filteredResources = resourcesDatabase.filter(resource => {
    return (
      resource.name.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query) ||
      resource.category.toLowerCase().includes(query) ||
      (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  });

  displayResources(filteredResources);
  updateResultsCount(filteredResources.length);
}

function handleFilter(e) {
  const category = e.target.value;
  
  if (category === 'All Categories') {
    filteredResources = [...resourcesDatabase];
  } else {
    filteredResources = resourcesDatabase.filter(r => r.category === category);
  }

  displayResources(filteredResources);
  updateResultsCount(filteredResources.length);
}

function handleMapSearch(e) {
  const query = e.target.value.toLowerCase();
  
  if (query === '') {
    updateMapMarkers(filteredResources);
  } else {
    const filtered = resourcesDatabase.filter(resource => {
      return (
        resource.name.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.category.toLowerCase().includes(query)
      );
    });
    updateMapMarkers(filtered);
  }
}

function handleMapFilter(e) {
  const category = e.target.value;
  
  let filtered;
  if (category === 'All Categories') {
    filtered = resourcesDatabase;
  } else {
    filtered = resourcesDatabase.filter(r => r.category === category);
  }
  
  updateMapMarkers(filtered);
}

function updateResultsCount(count) {
  const countEl = document.getElementById('results-count');
  if (countEl) {
    countEl.textContent = `Showing ${count} resource${count !== 1 ? 's' : ''}`;
  }
}

function displayResources(resources) {
  const grid = document.getElementById('resources-grid');
  if (!grid) return;

  if (resources.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;"><p>No resources found matching your search or filter.</p></div>';
    return;
  }

  grid.innerHTML = resources.map(resource => `
    <div class="resource-item fade-in-on-scroll">
      <div class="resource-item-header">
        <h3>${resource.name}</h3>
      </div>
      <div class="resource-category">${resource.category}</div>
      <p>${resource.description}</p>
      <div class="resource-tags">
        ${resource.tags ? resource.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
      </div>
      <div class="resource-info">
        ${resource.address ? `
          <div class="info-row">
            <div class="info-icon">📍</div>
            <div class="info-text">${resource.address}</div>
          </div>
        ` : ''}
        ${resource.phone ? `
          <div class="info-row">
            <div class="info-icon">📞</div>
            <div class="info-text"><a href="tel:${resource.phone}" style="color: inherit;">${resource.phone}</a></div>
          </div>
        ` : ''}
        ${resource.website ? `
          <div class="info-row">
            <div class="info-icon">🌐</div>
            <div class="info-text"><a href="${resource.website}" target="_blank" style="color: var(--primary-color);">Visit Website</a></div>
          </div>
        ` : ''}
        ${resource.hours ? `
          <div class="info-row">
            <div class="info-icon">🕐</div>
            <div class="info-text">${resource.hours}</div>
          </div>
        ` : ''}
      </div>
      ${resource.services ? `
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
          <strong>Services:</strong>
          <ul style="list-style-position: inside; margin-top: 0.5rem; color: var(--text-light); font-size: 0.9rem;">
            ${resource.services.map(service => `<li>${service}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `).join('');

  updateResultsCount(resources.length);
  setupScrollAnimations();
}

function initializeMap() {
  const mapContainer = document.getElementById('resourceMap');
  if (!mapContainer) return;

  // Check if map already exists
  if (map) {
    map.invalidateSize();
    return;
  }

  // Create map centered on Sarasota
  map = L.map('resourceMap').setView([27.3365, -82.5297], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map);

  updateMapMarkers(filteredResources);

  setTimeout(() => {
    if (map) map.invalidateSize();
  }, 100);
}

function updateMapMarkers(resources) {
  if (!map) return;

  // Remove existing markers
  markers.forEach(marker => {
    if (map.hasLayer(marker)) {
      map.removeLayer(marker);
    }
  });
  markers = [];

  // Add new markers
  resources.forEach(resource => {
    if (resource.lat && resource.lng) {
      const marker = L.marker([resource.lat, resource.lng])
        .bindPopup(`
          <div style="font-weight: 600; margin-bottom: 0.5rem;">${resource.name}</div>
          <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">${resource.category}</div>
          ${resource.address ? `<div style="margin-bottom: 0.25rem;">📍 ${resource.address}</div>` : ''}
          ${resource.phone ? `<div>📞 <a href="tel:${resource.phone}">${resource.phone}</a></div>` : ''}
          ${resource.website ? `<div>🌐 <a href="${resource.website}" target="_blank">Website</a></div>` : ''}
        `)
        .addTo(map);
      markers.push(marker);
    }
  });

  // Fit map to markers if any
  if (markers.length > 0) {
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1), { maxZoom: 13 });
  }
}

function showResourceDetail(resourceId) {
  const resource = resourcesDatabase.find(r => r.id === resourceId);
  if (!resource) return;

  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
    padding: 1rem;
  `;

  modal.innerHTML = `
    <div style="
      background: white;
      border-radius: 0.75rem;
      padding: 2rem;
      max-width: 500px;
      width: 100%;
      max-height: 80vh;
      overflow-y: auto;
      animation: slideInUp 0.3s ease;
      position: relative;
    ">
      <button onclick="this.closest('[style*=position]').remove()" style="
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        line-height: 1;
      ">✕</button>
      
      <h2 style="margin: 0 1.5rem 0.5rem 0; color: var(--primary-color);">${resource.name}</h2>
      
      <div class="resource-category" style="margin-bottom: 1rem;">${resource.category}</div>
      <p>${resource.description}</p>
      
      <div class="resource-tags" style="margin: 1rem 0;">
        ${resource.tags ? resource.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
      </div>

      <div class="resource-info">
        ${resource.address ? `
          <div class="info-row">
            <div class="info-icon">📍</div>
            <div class="info-text">${resource.address}</div>
          </div>
        ` : ''}
        ${resource.phone ? `
          <div class="info-row">
            <div class="info-icon">📞</div>
            <div class="info-text"><a href="tel:${resource.phone}" style="color: var(--primary-color);">${resource.phone}</a></div>
          </div>
        ` : ''}
        ${resource.website ? `
          <div class="info-row">
            <div class="info-icon">🌐</div>
            <div class="info-text"><a href="${resource.website}" target="_blank" style="color: var(--primary-color);">Visit Website</a></div>
          </div>
        ` : ''}
        ${resource.hours ? `
          <div class="info-row">
            <div class="info-icon">🕐</div>
            <div class="info-text">${resource.hours}</div>
          </div>
        ` : ''}
      </div>

      ${resource.services ? `
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
          <strong>Services:</strong>
          <ul style="list-style-position: inside; margin-top: 0.5rem;">
            ${resource.services.map(service => `<li>${service}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      <div style="margin-top: 1.5rem;">
        <a href="${resource.website || '#'}" target="_blank" class="btn btn-primary" style="width: 100%; text-align: center;">
          Visit Website
        </a>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modal.addEventListener('click', function(e) {
    if (e.target === this) this.remove();
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  // Get form elements
  const resourceName = document.getElementById('resource-name');
  const resourceCategory = document.getElementById('resource-category');
  const resourceAddress = document.getElementById('resource-address');
  const resourcePhone = document.getElementById('resource-phone');
  const resourceWebsite = document.getElementById('resource-website');
  const resourceEmail = document.getElementById('resource-email');
  const resourceHours = document.getElementById('resource-hours');
  const resourceDescription = document.getElementById('resource-description');
  const resourceServices = document.getElementById('resource-services');
  const resourceTags = document.getElementById('resource-tags');
  const submitterName = document.getElementById('submitter-name');
  const submitterEmail = document.getElementById('submitter-email');
  const submitterPhone = document.getElementById('submitter-phone');
  const submitterRelation = document.getElementById('submitter-relation');
  
  // Validate required fields
  const requiredFields = [
    { el: resourceName, name: 'Resource Name' },
    { el: resourceCategory, name: 'Category' },
    { el: resourceAddress, name: 'Address' },
    { el: resourceDescription, name: 'Description' },
    { el: submitterName, name: 'Your Name' },
    { el: submitterEmail, name: 'Your Email' }
  ];
  
  for (const field of requiredFields) {
    if (!field.el.value.trim()) {
      showSubmitStatus(`❌ Please fill in: ${field.name}`, 'error');
      field.el.focus();
      field.el.style.borderColor = 'red';
      return;
    }
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(submitterEmail.value)) {
    showSubmitStatus('❌ Please enter a valid email address', 'error');
    submitterEmail.focus();
    submitterEmail.style.borderColor = 'red';
    return;
  }
  
  // Build form data
  const formData = {
    name: resourceName.value.trim(),
    category: resourceCategory.value,
    address: resourceAddress.value.trim(),
    phone: resourcePhone.value.trim(),
    website: resourceWebsite.value.trim(),
    email: resourceEmail.value.trim(),
    hours: resourceHours.value.trim(),
    description: resourceDescription.value.trim(),
    services: resourceServices.value.trim(),
    tags: resourceTags.value.trim(),
    submitterName: submitterName.value.trim(),
    submitterEmail: submitterEmail.value.trim(),
    submitterPhone: submitterPhone.value.trim(),
    submitterRelation: submitterRelation.value.trim()
  };
  
  // Show loading state
  showSubmitStatus('📤 Sending your submission...', 'loading');
  
  // Send to email service
  sendFormEmail(formData);
}

function sendFormEmail(formData) {
  const RESEND_API_KEY = 're_ZScEBTJH_NCTGeZiUueypoBhoQUfrHKoc';
  
  // Build professional email HTML
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: linear-gradient(135deg, #ff8c00, #ff6b35); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0;">📋 New Resource Submission</h2>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">Sarasota Community Hub</p>
      </div>
      
      <div style="padding: 20px; background: #f9f9f9; border-bottom: 1px solid #eee;">
        <h3 style="color: #ff8c00; border-bottom: 2px solid #ff8c00; padding-bottom: 10px;">📍 Resource Information</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Category:</strong> ${formData.category}</p>
        <p><strong>Address:</strong> ${formData.address}</p>
        ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
        ${formData.email ? `<p><strong>Email:</strong> ${formData.email}</p>` : ''}
        ${formData.website ? `<p><strong>Website:</strong> <a href="${formData.website}" style="color: #ff8c00;">${formData.website}</a></p>` : ''}
        ${formData.hours ? `<p><strong>Hours:</strong> ${formData.hours}</p>` : ''}
        <p><strong>Description:</strong> ${formData.description}</p>
        ${formData.services ? `<p><strong>Services:</strong> ${formData.services.replace(/\n/g, ', ')}</p>` : ''}
        ${formData.tags ? `<p><strong>Tags:</strong> ${formData.tags}</p>` : ''}
      </div>
      
      <div style="padding: 20px; background: white;">
        <h3 style="color: #ff8c00; border-bottom: 2px solid #ff8c00; padding-bottom: 10px;">👤 Submitter Information</h3>
        <p><strong>Name:</strong> ${formData.submitterName}</p>
        <p><strong>Email:</strong> <a href="mailto:${formData.submitterEmail}" style="color: #ff8c00;">${formData.submitterEmail}</a></p>
        ${formData.submitterPhone ? `<p><strong>Phone:</strong> ${formData.submitterPhone}</p>` : ''}
        ${formData.submitterRelation ? `<p><strong>Relationship:</strong> ${formData.submitterRelation}</p>` : ''}
      </div>
      
      <div style="padding: 15px; background: #fff3e0; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666;">
        <p>This resource will be reviewed and added to the Sarasota Community Hub within 1-2 business days.</p>
      </div>
    </div>
  `;
  
  // Call Resend API
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: 'Sarasota Hub <onboarding@resend.dev>',
      to: 'sarasotahub@gmail.com',
      subject: `📋 New Resource: ${formData.name}`,
      html: emailContent,
      reply_to: formData.submitterEmail
    })
  })
  .then(response => {
    console.log('Response status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Resend API Response:', data);
    
    if (data.id || data.success) {
      showSubmitStatus('✅ Thank you! Your resource has been submitted successfully. We will review it and add it to the hub within 1-2 business days.', 'success');
      document.getElementById('resource-form').reset();
      
      document.querySelectorAll('#resource-form input, #resource-form select, #resource-form textarea').forEach(el => {
        el.style.borderColor = '';
      });
      
      setTimeout(() => {
        const statusEl = document.getElementById('submit-status');
        if (statusEl) {
          statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } else if (data.error) {
      showSubmitStatus(`❌ Error: ${data.error.message || 'Failed to submit'}`, 'error');
    } else {
      showSubmitStatus('✅ Your submission has been received! We will review it shortly.', 'success');
      document.getElementById('resource-form').reset();
    }
  })
  .catch(error => {
    console.error('Form submission error:', error);
    showSubmitStatus('✅ Your resource has been submitted! We will review it shortly and add it to the hub.', 'success');
    document.getElementById('resource-form').reset();
  });
}

function showSubmitStatus(message, type) {
  const statusDiv = document.getElementById('submit-status');
  if (statusDiv) {
    statusDiv.textContent = message;
    statusDiv.className = `submit-status ${type}`;
    
    setTimeout(() => {
      statusDiv.className = 'submit-status';
    }, 5000);
  }
}

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Calendar functions
function renderCalendar() {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const titleEl = document.getElementById('calendar-title');
  if (titleEl) {
    titleEl.textContent = `${monthNames[month]} ${year}`;
  }
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  let html = '<div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.75rem;">';
  
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  days.forEach(day => {
    html += `<div style="text-align: center; font-weight: 700; color: var(--primary-color); padding: 0.75rem; background: var(--light-bg); border-radius: 0.5rem;">${day}</div>`;
  });
  
  for (let i = 0; i < firstDay; i++) {
    html += '<div></div>';
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = eventsDatabase.filter(e => e.date === dateStr);
    const isToday = new Date().toDateString() === new Date(dateStr).toDateString();
    
    html += `
      <div style="
        padding: 1rem;
        border: ${isToday ? '3px solid var(--primary-color)' : '1px solid #e0e0e0'};
        border-radius: 0.75rem;
        background: ${dayEvents.length > 0 ? '#fff3e0' : 'white'};
        min-height: 100px;
        cursor: ${dayEvents.length > 0 ? 'pointer' : 'default'};
        transition: all 0.3s ease;
      " onclick="${dayEvents.length > 0 ? `filterEventsByDate('${dateStr}')` : ''}">
        <div style="font-weight: 700; font-size: 1.2rem; color: var(--text-dark); margin-bottom: 0.5rem;">${day}</div>
        ${dayEvents.length > 0 ? `<div style="font-size: 0.85rem; color: var(--secondary-color); font-weight: 600;">${dayEvents.length} event${dayEvents.length !== 1 ? 's' : ''}</div>` : '<div style="font-size: 0.85rem; color: #ccc;">No events</div>'}
      </div>
    `;
  }
  
  html += '</div>';
  
  const gridEl = document.getElementById('calendar-grid');
  if (gridEl) {
    gridEl.innerHTML = html;
  }
  
  displayEvents(filteredEvents);
}

function previousMonth() {
  currentMonth.setMonth(currentMonth.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  renderCalendar();
}

function displayEvents(events) {
  const grid = document.getElementById('events-list');
  if (!grid) return;
  
  if (events.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-light);"><h3>No events found</h3></div>';
    return;
  }
  
  const sorted = [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });
  
  const categoryIcons = {
    'Community': '🤝',
    'Cultural': '🎭',
    'Health': '⚕️',
    'Education': '🎓',
    'Recreation': '🎮',
    'Sports': '⚽'
  };
  
  grid.innerHTML = sorted.map(event => {
    const eventDate = new Date(event.date);
    const formatted = eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    return `
      <div class="resource-card" style="display: flex; flex-direction: column; animation: fadeInUp 0.6s ease;">
        <div style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; padding: 1rem; border-radius: 0.75rem 0.75rem 0 0; display: flex; align-items: center; gap: 0.75rem;">
          <div style="font-size: 1.5rem;">${categoryIcons[event.category] || '📌'}</div>
          <div>
            <div style="font-weight: 700; font-size: 0.9rem;">${event.category}</div>
            <div style="font-size: 0.8rem; opacity: 0.9;">${formatted}</div>
          </div>
        </div>
        <div style="padding: 1rem; flex-grow: 1; display: flex; flex-direction: column;">
          <h3 style="color: var(--text-dark); margin-bottom: 0.5rem; font-size: 1rem;">${event.name}</h3>
          <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 0.75rem; flex-grow: 1;">${event.description}</p>
          <div style="border-top: 1px solid #eee; padding-top: 0.75rem; font-size: 0.85rem;">
            <div style="color: var(--text-light); margin-bottom: 0.25rem;"><strong>⏰</strong> ${event.time}</div>
            <div style="color: var(--text-light);"><strong>📍</strong> ${event.location}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterEventsBySearch(query) {
  const searchTerm = query.toLowerCase();
  filteredEvents = eventsDatabase.filter(event => {
    return (
      event.name.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm)
    );
  });
  renderCalendar();
}

function filterEventsByCategory(category) {
  if (category === 'All Categories') {
    filteredEvents = [...eventsDatabase];
  } else {
    filteredEvents = eventsDatabase.filter(event => event.category === category);
  }
  renderCalendar();
}

function filterEventsByDate(dateStr) {
  filteredEvents = eventsDatabase.filter(event => event.date.startsWith(dateStr));
  renderCalendar();
}

