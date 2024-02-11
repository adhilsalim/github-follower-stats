/**
 * CLI tool to retrieve and analyze follower statistics for a GitHub user.
 * Features:
 * 1. View the list of users we are following.
 * 2. View the list of users who are following us.
 * 3. Identify users who are not following us back.
 * 4. Identify users whom we are not following back.
 */

let following = [];
let followers = [];

async function main() {
  // get username from command line arguments
  const username = process.argv[2];

  if (!username) {
    console.log("Please provide a username.");
    process.exit();
  }

  // get followers
  console.log("\nFollowers:\n");
  await getFollowing(username);

  // get following
  console.log("\nFollowing:\n");
  await getFollowers(username);

  // get users who are not following us back
  console.log("\nUsers who are not following us back:\n");
  await getNotFollowingBack("notFollowingBack");

  // get users whom we are not following back
  console.log("\nUsers whom we are not following back:\n");
  await getNotFollowingBack("notFollowedByUser");
}

main();

/**
 * Retrieves the list of users that a given GitHub user is following.
 * @param {string} username - The GitHub username.
 * @returns {Promise<void>} - A Promise that resolves with the list of following users.
 */
async function getFollowing(username) {
  let page = 1;
  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${username}/following?page=${page}`
    );
    const data = await response.json();
    if (data.length === 0) {
      break;
    }
    following = following.concat(data);
    page++;
  }

  following.map((user, index) => {
    console.log(`${index + 1}. ${user.login} - ${user.html_url}`);
  });
}

/**
 * Retrieves all the followers of a given GitHub user.
 * @param {string} username - The GitHub username.
 * @returns {Promise<void>} - A promise that resolves when all the followers are fetched.
 */
async function getFollowers(username) {
  let page = 1;

  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${username}/followers?page=${page}`
    );
    const data = await response.json();

    if (data.length === 0) {
      break;
    }

    followers = followers.concat(data);
    page++;
  }

  followers.map((user, index) => {
    console.log(`${index + 1}. ${user.login} - ${user.html_url}`);
  });
}

async function getNotFollowingBack(actionType) {
  if (actionType == "notFollowingBack") {
    const notFollowingBack = following.filter((following) => {
      return !followers.find((follower) => {
        return follower.login === following.login;
      });
    });

    notFollowingBack.map((user, index) => {
      console.log(`${index + 1}. ${user.login} - ${user.html_url}`);
    });
  } else if (actionType == "notFollowedByUser") {
    const notFollowingBack = followers.filter((follower) => {
      return !following.find((following) => {
        return following.login === follower.login;
      });
    });

    notFollowingBack.map((user, index) => {
      console.log(`${index + 1}. ${user.login} - ${user.html_url}`);
    });
  } else {
    console.log("Please provide a valid action type.");
  }
}
