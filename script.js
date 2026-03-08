// Fake bike data (unique: includes mock verification status, AI price)
const bikes = [
    { model: 'Honda Activa 6G', price: 65000, km: 12000, city: 'Pimpri', rc: 'MH12AB1234', verified: true, aiPrice: '₹62k - Fair deal' },
    { model: 'Bajaj Pulsar 150', price: 75000, km: 25000, city: 'Pune', rc: 'MH04CD5678', verified: false, aiPrice: '₹70k - Slightly high' },
    { model: 'Hero Splendor', price: 45000, km: 30000, city: 'Mumbai', rc: 'MH01EF9012', verified: true, aiPrice: '₹48k - Good value' }
];

function renderListings(data = bikes) {
    const container = document.getElementById('listings');
    container.innerHTML = data.map(bike => `
        <div class="listing ${bike.verified ? 'verified' : ''}">
            <h3>${bike.model} in ${bike.city}</h3>
            <p>Price: ₹${bike.price.toLocaleString()} | ${bike.km} km</p>
            <p class="price-ai">AI Fair Price: ${bike.aiPrice}</p>
            <p>RC: ${bike.rc} ${bike.verified ? '(Verified - No loans/theft)' : '(Verify to list)'}</p>
            <button onclick="alert('Contact seller simulation')">Contact</button>
        </div>
    `).join('');
}

document.getElementById('search').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = bikes.filter(b => b.model.toLowerCase().includes(term) || b.city.toLowerCase().includes(term));
    renderListings(filtered);
});

function addListing() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

document.getElementById('listingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const rcNum = document.getElementById('rcNum').value;
    // Mock RTO API (in real: fetch('https://api.rapidapi.com/rto?rc=' + rcNum))
    const result = rcNum.includes('AB') ? 'Verified: No issues!' : 'Issue: Check loan/theft';
    document.getElementById('rcResult').innerHTML = `<strong>${result}</strong> (Mock - Integrate real API next)`;
    // Simulate add to list
    bikes.push({ model: 'New Listing', price: 0, km: 0, city: 'Pimpri', rc: rcNum, verified: true, aiPrice: 'AI calc pending' });
    renderListings();
    closeModal();
});

renderListings(); // Initial load
