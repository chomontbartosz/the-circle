import { Link } from "react-router-dom";

import { AddPostIcon, FollowIcon } from "./Icons";
import { MOCK_FOLLOW_REQUESTS as requests, MOCK_SUGGESTIONS as suggestions } from "../../constants";

// Atrapa - dane statyczne z constants, akcje (poza "Add new post") nie są jeszcze podpięte.
const RightSidebar = () => {
  return (
    <aside className="rightsidebar">
      <Link to="/create-post" className="rightsidebar-cta">
        <AddPostIcon width={20} height={20} />
        Add new post
      </Link>

      <section className="rightsidebar-section">
        <div className="flex items-center gap-2">
          <h3 className="rightsidebar-title">Requests</h3>
          <span className="rightsidebar-badge">{requests.length}</span>
        </div>

        <ul className="flex flex-col gap-4">
          {requests.map((request) => (
            <li key={request.id} className="flex items-start gap-3">
              <img src={request.avatar} alt="" className="rightsidebar-avatar" />
              <div className="flex flex-col gap-2 min-w-0">
                <p className="rightsidebar-text">
                  <span className="font-semibold text-light-1">{request.name}</span> wants to follow you.
                </p>
                <div className="flex gap-4">
                  <button type="button" className="rightsidebar-action text-primary-500 hover:opacity-80">
                    Accept
                  </button>
                  <button type="button" className="rightsidebar-action text-light-2/60 text-thin hover:text-light-2">
                    Decline
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-dark-4" />

      <section className="rightsidebar-section">
        <h3 className="rightsidebar-title">Suggestions for you</h3>

        <ul className="flex flex-col gap-4">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} className="flex items-center gap-3">
              <img src={suggestion.avatar} alt="" className="rightsidebar-avatar" />
              <div className="flex flex-col min-w-0 flex-1">
                <p className="rightsidebar-text font-semibold text-light-1 truncate">{suggestion.name}</p>
                <p className="rightsidebar-subtext">{suggestion.bio}</p>
              </div>
              <button type="button" aria-label={`Follow ${suggestion.name}`} className="shrink-0 ml-auto p-1 rounded-md transition hover:bg-dark-4">
                <FollowIcon width={20} height={20} className="text-primary-500" />
              </button>
            </li>
          ))}
        </ul>

        <button type="button" className="rightsidebar-action text-primary-500 self-center mt-2 hover:opacity-80">
          View all
        </button>
      </section>
    </aside>
  );
};

export default RightSidebar;
