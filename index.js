/**
 * CLI tool to retrieve and analyze follower statistics for a GitHub user.
 * Features:
 * 1. View the list of users we are following.
 * 2. View the list of users who are following us.
 * 3. Identify users who are not following us back.
 * 4. Identify users whom we are not following back.
 */

async function main() {
  // get username from command line arguments
  const username = process.argv[2];

  if (!username) {
    console.log("Please provide a username.");
    process.exit();
  }

  // get followers
  console.log("Followers:");
  await getFollowing(username);

  // get following
  console.log("Following:");
  await getFollowers(username);
}

main();

async function getFollowing(username) {
  let page = 1;
  let following = [];
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

async function getFollowers(username) {
  let page = 1;
  let followers = [];

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
