import React from "react";
import styles from "./UserItem.module.css";

function UserItem() {
  let editMode = false;

  if (editMode)
    return (
      <div className={styles.main}>
        <div className={styles.first}>
          <div>Name</div>
          <div>Email</div>
        </div>

        <div>UserName</div>

        <div>Status</div>

        <div>Clan</div>

        <div className={styles.last}>
          <div>Save</div>
          <div>Cancel</div>
        </div>
      </div>
    );

  return (
    <div className={styles.main}>
      <div className={styles.first}>
        <div>Name</div>
        <div>Email</div>
      </div>

      <div>UserName</div>

      <div>Status</div>

      <div>Clan</div>

      <div className={styles.last}>
        <div>Edit</div>
        <div>Delete</div>
      </div>
    </div>
  );
}

export default UserItem;
