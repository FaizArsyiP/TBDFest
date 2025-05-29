import Link from 'next/link';

export default function SignIn() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#FFFBE6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <h1 style={{ 
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: 'black',
        marginBottom: '30px'
      }}>
        Login
      </h1>

      <div style={{ width: '100%', maxWidth: '400px' }}>
        <label style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          display: 'block',
          marginBottom: '8px'
        }}>
          Username/email
        </label>
        <input 
          type="text" 
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '15px',
            border: 'none',
            backgroundColor: '#D5ED9F',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            marginBottom: '20px',
            boxSizing: 'border-box'
          }}
        />

        <label style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          display: 'block',
          marginBottom: '8px'
        }}>
          Password
        </label>
        <input 
          type="password" 
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '15px',
            border: 'none',
            backgroundColor: '#D5ED9F',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            marginBottom: '30px',
            boxSizing: 'border-box'
          }}
        />

        <button 
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '15px',
            border: 'none',
            backgroundColor: '#624E88',
            color: 'white',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          Login
        </button>

        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          textAlign: 'center'
        }}>
          Don't have an account yet?{' '}
          <Link href="/page3" passHref>
            <span style={{
              color: '#0979FC',
              fontFamily: "'Work Sans', sans-serif",
              cursor: 'pointer'
            }}>
              Create one.
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}