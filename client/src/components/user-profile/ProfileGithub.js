import Reac, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithub = ({ username, repos, getGithubRepos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, []);

  return repos == null ? (
    <Spinner />
  ) : (
    repos.map((repo) => (
      <div class="repo bg-white p-1 my-1">
        <div>
          <h4>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div>
          <ul>
            <li class="badge badge-primary">Stars: {repo.stargazers_count}</li>
            <li class="badge badge-dark">Watchers: {repo.watchers_count}</li>
            <li class="badge badge-light">Forks: {repo.forks_count}</li>
          </ul>
        </div>
      </div>
    ))
  );
};
ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
