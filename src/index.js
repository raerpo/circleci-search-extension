import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [branches, setBranches] = useState(null);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [credentialsError, setCredentialsError] = useState(null)

    useEffect(() => {
        fetch('https://circleci.com/api/v1/projects?shallow=true')
            .then(res => {
                if (res.status === 401) {
                    setCredentialsError(res);
                } else {
                    return res.json()
                }
            })
            .then(projects => {
                setLoading(false);
                setProjects(projects);
            })
    }, []);

    useEffect(() => {
        if (selectedProject) {
            const branches = projects.find(project => project.reponame === selectedProject).branches;
            const branchesNames = Object.keys(branches).map(b => decodeURIComponent(b));
            setBranches(branchesNames);
        }
    }, [selectedProject])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const bySearchTerm = (branch) => {
        return branch.toLowerCase().includes(searchTerm.toLowerCase());
    }

    const selectProject = (reponame) => {
        setSelectedProject(reponame);
    }

    if (loading) return <p>Loading...</p>

    if (credentialsError) {
        return <p>You need to be logged in on CircleCI to be able to use this.</p>
    }

    if (projects && !selectedProject) {
        return <div>
            <h2 className="title">CircleCI Search</h2>
            <h3 className="subtitle">Projects:</h3>
            <ul className="projects__container">
                {projects.map(project => <li key={project.reponame} onClick={() => selectProject(project.reponame)}>{project.reponame}</li>)}
            </ul>
        </div>
    }

    return <div>
        <div className="title__container">
            <h2 className="title">CircleCI Search</h2>
            <button className="go-back__button" onClick={() => setSelectedProject(null)}>Go back</button>
        </div>
        <input type="text" className="search" onChange={handleSearch} placeholder="Search a branch" />
        {branches ? <ul className="branches__container">{branches.filter(bySearchTerm).map(branch => <li key={branch}><a href={`${process.env.CIRCLECI_URL}${selectedProject}?branch=${branch}`}>{branch}</a></li>)}</ul> : <p>No branch match the search</p>}
    </div>
}

ReactDOM.render(<App />, document.querySelector('#root'))