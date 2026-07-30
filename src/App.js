import React, { useState, useEffect } from 'react';

// --- STYLES INLINE (Design moderne & épuré) ---
const styles = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: '40px 16px',
    color: '#0f172a'
  },
  header: {
    maxWidth: '500px',
    margin: '0 auto 32px auto',
    textAlign: 'center'
  },
  title: { fontSize: '32px', fontWeight: '800', margin: 0, color: '#0f172a' },
  subtitle: { fontSize: '15px', color: '#64748b', marginTop: '6px' },
  cardGrid: {
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    transition: 'all 0.2s ease'
  },
  cardCompleted: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0'
  },
  badge: {
    backgroundColor: '#fff7ed',
    color: '#ea580c',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700'
  },
  category: {
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#94a3b8'
  },
  timerText: {
    fontSize: '26px',
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#334155'
  },
  button: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  buttonPause: {
    backgroundColor: '#f59e0b'
  }
};

// --- COMPOSANT CARTE D'HABITUDE ---
function HabitCard({ habit, onToggleComplete }) {
  const [timeLeft, setTimeLeft] = useState(120); // Timer de 2 minutes
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && !habit.completed) {
      setIsActive(false);
      onToggleComplete(habit.id);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, habit.completed]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isDone = habit.completed;

  return (
    <div style={{ ...styles.card, ...(isDone ? styles.cardCompleted : {}) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <span style={styles.category}>{habit.category}</span>
          <h3 style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: '700' }}>{habit.title}</h3>
        </div>
        <div style={styles.badge}>
          🔥 {isDone ? habit.streak + 1 : habit.streak}d streak
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
        <div style={styles.timerText}>{formatTime(timeLeft)}</div>

        {isDone ? (
          <div style={{ color: '#16a34a', fontWeight: '700', fontSize: '14px' }}>
            ✓ Terminé !
          </div>
        ) : (
          <button
            onClick={() => setIsActive(!isActive)}
            style={{
              ...styles.button,
              ...(isActive ? styles.buttonPause : {})
            }}
          >
            {isActive ? 'Pause' : 'Démarrer (2 min)'}
          </button>
        )}
      </div>
    </div>
  );
}

// --- PAGE PRINCIPALE ---
export default function App() {
  const [habits, setHabits] = useState([
    { id: 1, title: 'Boire un grand verre d\'eau', category: 'Santé', streak: 4, completed: false },
    { id: 2, title: 'Lire 1 page d\'un livre', category: 'Mental', streak: 12, completed: false },
    { id: 3, title: 'Faire 10 pompes', category: 'Fitness', streak: 2, completed: false }
  ]);

  const handleToggle = (id) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: true } : h));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Nudge</h1>
        <p style={styles.subtitle}>Micro-habitudes. 2 minutes par jour.</p>
      </header>

      <main style={styles.cardGrid}>
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} onToggleComplete={handleToggle} />
        ))}
      </main>
    </div>
  );
}