import { useState } from 'react'
import styles from './GitProfileSearch.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchGit = () => {

  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setUserData(null);
    if (username.trim() === '') {
      setError('Por favor, digite um nome de usuário.');
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError('Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente.');
        } else {
          setError('Ocorreu um erro ao buscar o perfil.');
        }
        return;
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError('Ocorreu um erro ao conectar com a API do GitHub.');
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.Header}>
        <header className={styles.headerBox}>
        <scan className={styles.headerLogo}>
        <img className={styles.headerImage} src="https://img.icons8.com/ios11/512/FFFFFF/github.png" alt="" />
        </scan>
        <h1 className={styles.headerText}> Perfil  <h1 className={styles.headerText2}> GitHub</h1></h1>
        </header>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputName}
          type="text"
          placeholder="Digite um usuário do GitHub"
          value={username}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button className={styles.searchButton} onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff" }} />
        </button>
      </div>

      <div className={styles.userData}>
      {userData && (
        <div className={styles.userDataInfos}>
          <div className={styles.userDataBox}>
          <img
            className={styles.dataAvatar}
            src={userData.avatar_url}
            alt={`Avatar de ${userData.login}`}
          />
          <div className={styles.dataText}>
          <h2 className={styles.dataLogin}>{userData.login}</h2>
          <p className={styles.dataReturn}>{userData.bio || 'Nenhuma bio disponível.'}</p>
          </div>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
      </div>
      </div>
  );
};

export default SearchGit
