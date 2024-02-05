/**
 * CLI tool to retrieve and analyze follower statistics for a GitHub user.
 * Features:
 * 1. View the list of users we are following.
 * 2. View the list of users who are following us.
 * 3. Identify users who are not following us back.
 * 4. Identify users whom we are not following back.
 */

// get username from command line arguments
const username = process.argv[2];

if (!username) {
  console.log("Please provide a username.");
  process.exit();
}
