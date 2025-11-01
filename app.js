// Application Data
const appData = {
    pestpac_features: {
        communication_methods: ["Print Mailing", "Email Automation", "SMS Notifications", "Customer Portal"],
        user_ratings: {
            capterra: 3.9,
            g2: 4.2,
            software_advice: 3.9,
            trustradius: 7.0,
            google_play: 2.7,
            apple_store: 2.4
        },
        pricing_tiers: ["Small Business", "Professional", "Enterprise"],
        key_features: ["Mail Merge", "Route Optimization", "Mobile App", "Analytics Dashboard", "Customer Portal", "Print Marketing Integration"]
    },
    setup_steps: [
        {
            step: 1,
            title: "System Requirements Check",
            description: "Verify your system meets PestPac requirements",
            tasks: ["Admin Access", "Internet Connection", "Browser Compatibility", "Login Credentials"],
            estimated_time: "5 minutes",
            difficulty: "Easy"
        },
        {
            step: 2,
            title: "Access Main Setup Area",
            description: "Navigate to PestPac settings and lookup tables",
            tasks: ["Login to PestPac", "Navigate to Menu", "Access Settings", "Find Lookup Tables"],
            estimated_time: "10 minutes",
            difficulty: "Easy"
        },
        {
            step: 3,
            title: "Communication Center Setup",
            description: "Configure the central communication hub",
            tasks: ["Admin Configuration", "User Permissions", "Email Integration", "Test Connections"],
            estimated_time: "30 minutes",
            difficulty: "Medium"
        },
        {
            step: 4,
            title: "Create Letter Templates",
            description: "Design your first customer letter template",
            tasks: ["Choose Letter Type", "Design Layout", "Add Company Branding", "Save Template"],
            estimated_time: "45 minutes",
            difficulty: "Medium"
        },
        {
            step: 5,
            title: "Configure Mail Merge",
            description: "Set up dynamic data insertion in letters",
            tasks: ["Select Data Fields", "Insert Merge Codes", "Format Fields", "Test with Sample Data"],
            estimated_time: "20 minutes",
            difficulty: "Hard"
        },
        {
            step: 6,
            title: "Create Mailing Lists",
            description: "Build targeted customer segments",
            tasks: ["Filter Customers", "Create Segments", "Validate Addresses", "Export Lists"],
            estimated_time: "25 minutes",
            difficulty: "Medium"
        },
        {
            step: 7,
            title: "Test Print Process",
            description: "Run test mailings to ensure everything works",
            tasks: ["Select Test Customers", "Generate Letters", "Review Output", "Print Samples"],
            estimated_time: "15 minutes",
            difficulty: "Easy"
        },
        {
            step: 8,
            title: "Go Live",
            description: "Launch your first real mailing campaign",
            tasks: ["Final Review", "Schedule Campaign", "Monitor Results", "Collect Feedback"],
            estimated_time: "10 minutes",
            difficulty: "Easy"
        }
    ],
    competitor_comparison: {
        pestpac: {ease_of_use: 3.5, features: 4.5, price: 3.0, support: 3.2},
        jobber: {ease_of_use: 4.8, features: 3.8, price: 4.2, support: 4.5},
        housecall_pro: {ease_of_use: 4.6, features: 4.0, price: 4.0, support: 4.3},
        fieldroutes: {ease_of_use: 3.8, features: 4.3, price: 3.5, support: 3.9}
    },
    user_satisfaction: {
        very_satisfied: 35,
        satisfied: 40,
        neutral: 15,
        dissatisfied: 7,
        very_dissatisfied: 3
    },
    common_issues: [
        {
            issue: "Mail merge fields appear empty",
            solution: "Check data exists in customer records and verify field mapping",
            frequency: "High"
        },
        {
            issue: "Letter formatting inconsistent",
            solution: "Review template margins and check font availability",
            frequency: "Medium"
        },
        {
            issue: "Print alignment problems",
            solution: "Adjust template margins and calibrate printer settings",
            frequency: "Medium"
        },
        {
            issue: "Communication Center connection failures",
            solution: "Verify network settings and check API credentials",
            frequency: "Low"
        }
    ],
    roi_metrics: {
        time_saved_per_week: 15,
        cost_per_letter: 0.75,
        response_rate: 3.5,
        customer_retention_improvement: 12,
        revenue_increase: 8.3
    },
    templates: [
        {
            name: "Service Reminder",
            type: "Recurring Communication",
            usage: "45%",
            effectiveness: "4.2/5"
        },
        {
            name: "Collection Notice",
            type: "Payment Communication",
            usage: "25%",
            effectiveness: "3.8/5"
        },
        {
            name: "Welcome Letter",
            type: "Onboarding",
            usage: "20%",
            effectiveness: "4.5/5"
        },
        {
            name: "Thank You Note",
            type: "Follow-up",
            usage: "10%",
            effectiveness: "4.1/5"
        }
    ],
    implementation_timeline: {
        week1: ["System setup", "Admin configuration", "Initial training"],
        week2: ["Template creation", "Mail merge setup", "Testing"],
        week3: ["List building", "Campaign setup", "Staff training"],
        week4: ["Go-live", "Monitoring", "Optimization"]
    }
};

// Global Variables
let currentStep = 1;
let currentSection = 'welcome';
let charts = {};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSetupWizard();
    initializeCharts();
    initializeTroubleshooting();
    updateTemplatePreview();
    calculateROI();
    updateProgress();
});

// Navigation Functions
function navigateToSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    document.getElementById(sectionId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
    
    // Show/hide progress container
    const progressContainer = document.getElementById('progressContainer');
    if (sectionId === 'setup-guide') {
        progressContainer.classList.remove('hidden');
        updateProgressBar();
    } else {
        progressContainer.classList.add('hidden');
    }
    
    currentSection = sectionId;
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function initializeNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            navigateToSection(sectionId);
        });
    });
}

// Setup Wizard Functions
function initializeSetupWizard() {
    updateStepContent();
    
    // Add click handlers to step items
    document.querySelectorAll('.step-item').forEach(item => {
        item.addEventListener('click', function() {
            const step = parseInt(this.getAttribute('data-step'));
            goToStep(step);
        });
    });
}

function updateStepContent() {
    const stepData = appData.setup_steps[currentStep - 1];
    const stepContent = document.getElementById('stepContent');
    
    stepContent.innerHTML = `
        <div class="step-header">
            <h3>${stepData.title}</h3>
            <p>${stepData.description}</p>
            <div class="step-meta">
                <span class="difficulty-badge difficulty-${stepData.difficulty.toLowerCase()}">${stepData.difficulty}</span>
                <span class="time-estimate">⏱️ ${stepData.estimated_time}</span>
            </div>
        </div>
        
        <div class="step-tasks">
            <h4>Tasks to Complete:</h4>
            <ul class="task-list">
                ${stepData.tasks.map((task, index) => `
                    <li class="task-item-step">
                        <div class="task-checkbox" id="task-${currentStep}-${index}" onclick="toggleTask(${currentStep}, ${index})"></div>
                        <span>${task}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="step-details">
            <button class="btn btn--outline" onclick="showStepDetails(${currentStep})">
                View Detailed Instructions
            </button>
        </div>
    `;
    
    // Update step navigation
    updateStepNavigation();
    updateProgressBar();
}

function updateStepNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentStep === 1;
    nextBtn.textContent = currentStep === 8 ? 'Complete Setup' : 'Next Step';
    
    // Update step indicators
    document.querySelectorAll('.step-item').forEach(item => {
        const step = parseInt(item.getAttribute('data-step'));
        item.classList.remove('active', 'completed');
        
        if (step === currentStep) {
            item.classList.add('active');
        } else if (step < currentStep) {
            item.classList.add('completed');
        }
    });
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const progressPercent = document.getElementById('progressPercent');
    
    const percentage = (currentStep / 8) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    if (progressText) {
        progressText.textContent = `Step ${currentStep} of 8`;
    }
    if (progressPercent) {
        progressPercent.textContent = `${Math.round(percentage)}%`;
    }
}

function nextStep() {
    if (currentStep < 8) {
        currentStep++;
        updateStepContent();
    } else {
        // Complete setup
        showModal('Setup Complete!', 'Congratulations! You have successfully completed the PestPac print mailing setup. Your system is now ready to use.');
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepContent();
    }
}

function goToStep(step) {
    if (step >= 1 && step <= 8) {
        currentStep = step;
        updateStepContent();
    }
}

function toggleTask(step, taskIndex) {
    const taskElement = document.getElementById(`task-${step}-${taskIndex}`);
    taskElement.classList.toggle('checked');
}

function showStepDetails(step) {
    const stepData = appData.setup_steps[step - 1];
    const detailContent = `
        <h4>Detailed Instructions for ${stepData.title}</h4>
        <p><strong>Description:</strong> ${stepData.description}</p>
        <p><strong>Estimated Time:</strong> ${stepData.estimated_time}</p>
        <p><strong>Difficulty Level:</strong> ${stepData.difficulty}</p>
        
        <h5>Step-by-Step Guide:</h5>
        <ol>
            ${stepData.tasks.map(task => `<li>${task} - Follow the on-screen prompts and ensure each task is completed before proceeding.</li>`).join('')}
        </ol>
        
        <div class="help-tip">
            <strong>💡 Pro Tip:</strong> Take your time with each step and don't hesitate to use the troubleshooting section if you encounter any issues.
        </div>
    `;
    
    showModal(`Step ${step} Details`, detailContent);
}

// Chart Functions
function initializeCharts() {
    initializeHeroSatisfactionChart();
    initializeSatisfactionChart();
    initializeComparisonChart();
    initializeTemplateChart();
}

function initializeHeroSatisfactionChart() {
    const ctx = document.getElementById('heroSatisfactionChart');
    if (!ctx) return;

    charts.heroSatisfaction = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
            datasets: [{
                data: [
                    appData.user_satisfaction.very_satisfied,
                    appData.user_satisfaction.satisfied,
                    appData.user_satisfaction.neutral,
                    appData.user_satisfaction.dissatisfied,
                    appData.user_satisfaction.very_dissatisfied
                ],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            }
        }
    });
}

function initializeSatisfactionChart() {
    const ctx = document.getElementById('satisfactionChart');
    if (!ctx) return;

    charts.satisfaction = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
            datasets: [{
                data: [
                    appData.user_satisfaction.very_satisfied,
                    appData.user_satisfaction.satisfied,
                    appData.user_satisfaction.neutral,
                    appData.user_satisfaction.dissatisfied,
                    appData.user_satisfaction.very_dissatisfied
                ],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            }
        }
    });
}

function initializeComparisonChart() {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;

    updateComparisonChart();
}

function updateComparisonChart() {
    const metric = document.getElementById('comparisonMetric').value;
    const ctx = document.getElementById('comparisonChart');
    
    if (charts.comparison) {
        charts.comparison.destroy();
    }

    const data = {
        labels: ['PestPac', 'Jobber', 'HouseCall Pro', 'FieldRoutes'],
        datasets: [{
            label: metric.replace('_', ' ').toUpperCase(),
            data: [
                appData.competitor_comparison.pestpac[metric],
                appData.competitor_comparison.jobber[metric],
                appData.competitor_comparison.housecall_pro[metric],
                appData.competitor_comparison.fieldroutes[metric]
            ],
            backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
        }]
    };

    charts.comparison = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function initializeTemplateChart() {
    const ctx = document.getElementById('templateChart');
    if (!ctx) return;

    charts.template = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: appData.templates.map(t => t.name),
            datasets: [{
                data: appData.templates.map(t => parseInt(t.usage)),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const template = appData.templates[context.dataIndex];
                            return `${template.name}: ${template.usage} (${template.effectiveness} effectiveness)`;
                        }
                    }
                }
            }
        }
    });
}

function refreshChart(chartType) {
    if (charts[chartType]) {
        charts[chartType].update();
    }
}

// Tools Functions
function switchTab(tabId) {
    // Hide all tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show target tab panel
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

function calculateROI() {
    const monthlyLetters = parseInt(document.getElementById('monthlyLetters').value) || 0;
    const currentCost = parseFloat(document.getElementById('currentCost').value) || 0;
    const timeSpent = parseInt(document.getElementById('timeSpent').value) || 0;
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value) || 0;
    
    // Calculate savings
    const currentMonthlyCost = monthlyLetters * currentCost;
    const newMonthlyCost = monthlyLetters * appData.roi_metrics.cost_per_letter;
    const costSavings = currentMonthlyCost - newMonthlyCost;
    
    const currentTimeValue = timeSpent * hourlyRate;
    const newTimeValue = 1 * hourlyRate; // Assume 1 hour with automation
    const timeSavings = currentTimeValue - newTimeValue;
    
    const totalMonthlySavings = costSavings + timeSavings;
    const annualSavings = totalMonthlySavings * 12;
    const timesSavedMonthly = timeSpent - 1;
    
    // Update display
    document.getElementById('monthlySavings').textContent = `$${Math.round(totalMonthlySavings)}`;
    document.getElementById('annualSavings').textContent = `$${Math.round(annualSavings).toLocaleString()}`;
    document.getElementById('timeSaved').textContent = `${timesSavedMonthly} hours`;
}

function updateTemplatePreview() {
    const templateType = document.getElementById('templateType').value;
    const companyName = document.getElementById('companyName').value;
    const primaryColor = document.getElementById('primaryColor').value;
    
    const preview = document.getElementById('letterPreview');
    
    let content = '';
    switch(templateType) {
        case 'service-reminder':
            content = `
                <div style="color: ${primaryColor}; font-size: 18px; font-weight: bold; margin-bottom: 20px;">
                    ${companyName}
                </div>
                <p>Dear [Customer Name],</p>
                <p>This is a friendly reminder that your next pest control service is scheduled for [Service Date].</p>
                <p>Our technician will arrive between [Time Window] to provide your regular treatment.</p>
                <p>If you need to reschedule, please contact us at [Phone Number].</p>
                <p>Thank you for choosing ${companyName}!</p>
            `;
            break;
        case 'collection-notice':
            content = `
                <div style="color: ${primaryColor}; font-size: 18px; font-weight: bold; margin-bottom: 20px;">
                    ${companyName} - Payment Notice
                </div>
                <p>Dear [Customer Name],</p>
                <p>Our records indicate that your account has an outstanding balance of $[Amount] for services rendered on [Service Date].</p>
                <p>Please remit payment within 10 days to avoid service interruption.</p>
                <p>Contact our office at [Phone Number] with any questions.</p>
            `;
            break;
        case 'welcome-letter':
            content = `
                <div style="color: ${primaryColor}; font-size: 18px; font-weight: bold; margin-bottom: 20px;">
                    Welcome to ${companyName}!
                </div>
                <p>Dear [Customer Name],</p>
                <p>Welcome to the ${companyName} family! We're excited to be your pest control partner.</p>
                <p>Your first service is scheduled for [Service Date]. Our technician will contact you 24 hours prior to confirm.</p>
                <p>We look forward to protecting your home and family.</p>
            `;
            break;
        case 'thank-you':
            content = `
                <div style="color: ${primaryColor}; font-size: 18px; font-weight: bold; margin-bottom: 20px;">
                    Thank You from ${companyName}
                </div>
                <p>Dear [Customer Name],</p>
                <p>Thank you for choosing ${companyName} for your pest control needs.</p>
                <p>Your recent service on [Service Date] has been completed. If you have any questions or concerns, please don't hesitate to contact us.</p>
                <p>We appreciate your business and trust in our services.</p>
            `;
            break;
    }
    
    preview.innerHTML = content;
}

function updateProgress() {
    const checkboxes = document.querySelectorAll('#progress-tracker input[type="checkbox"]');
    const checked = document.querySelectorAll('#progress-tracker input[type="checkbox"]:checked').length;
    const percentage = (checked / checkboxes.length) * 100;
    
    const progressFill = document.getElementById('overallProgress');
    const progressText = document.getElementById('progressPercentage');
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    if (progressText) {
        progressText.textContent = `${Math.round(percentage)}%`;
    }
}

// Troubleshooting Functions
function initializeTroubleshooting() {
    const accordion = document.getElementById('issuesAccordion');
    
    appData.common_issues.forEach((issue, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        accordionItem.innerHTML = `
            <div class="accordion-header" onclick="toggleAccordion(${index})">
                <h4 class="accordion-title">${issue.issue}</h4>
                <div class="frequency-badge frequency-${issue.frequency.toLowerCase()}">${issue.frequency}</div>
            </div>
            <div class="accordion-content" id="accordion-${index}">
                <p><strong>Solution:</strong> ${issue.solution}</p>
            </div>
        `;
        
        accordion.appendChild(accordionItem);
    });
}

function toggleAccordion(index) {
    const content = document.getElementById(`accordion-${index}`);
    const header = content.previousElementSibling;
    
    // Close all other accordions
    document.querySelectorAll('.accordion-content').forEach((item, i) => {
        if (i !== index) {
            item.classList.remove('active');
            item.previousElementSibling.classList.remove('active');
        }
    });
    
    // Toggle current accordion
    content.classList.toggle('active');
    header.classList.toggle('active');
}

function filterIssues() {
    const searchTerm = document.getElementById('issueSearch').value.toLowerCase();
    const items = document.querySelectorAll('.accordion-item');
    
    items.forEach(item => {
        const title = item.querySelector('.accordion-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Modal Functions
function showModal(title, content) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = content;
    document.getElementById('detailModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('detailModal').classList.add('hidden');
}

function openChat() {
    showModal('Live Chat', `
        <div style="text-align: center; padding: 20px;">
            <p>Live chat feature would be integrated with your customer support system.</p>
            <p>This is just connect you to me (Rushi) for demo</p>
            <button class="btn btn--primary" onclick="closeModal()">Close</button>
        </div>
    `);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event Listeners
window.addEventListener('resize', debounce(() => {
    Object.values(charts).forEach(chart => {
        if (chart) {
            chart.resize();
        }
    });
}, 250));

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (currentSection === 'setup-guide') {
        if (e.key === 'ArrowRight' && currentStep < 8) {
            nextStep();
        } else if (e.key === 'ArrowLeft' && currentStep > 1) {
            previousStep();
        }
    }
    
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Touch/Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (currentSection === 'setup-guide') {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentStep < 8) {
                // Swipe left - next step
                nextStep();
            } else if (diff < 0 && currentStep > 1) {
                // Swipe right - previous step
                previousStep();
            }
        }
    }
}

// Auto-save Progress (simulated)
setInterval(() => {
    if (currentSection === 'setup-guide') {
        // In a real application, this would save progress to a backend
        console.log(`Auto-saving progress: Step ${currentStep}`);
    }
}, 30000); // Save every 30 seconds