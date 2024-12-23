import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export const registerForPushNotificationsAsync = async () => {
  if (!Device.isDevice) {
    console.warn("Must use physical device for Push Notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.warn("The user denied notifications.");
    return;
  }

  console.log("Notifications are enabled.");

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Notification token:", token);

  return token;
};

export const scheduleJokeNotification = async (joke) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Joke of the Day!",
        body: joke,
      },
      trigger: null,
    });

    console.log("Notification scheduled successfully.");
  } catch (error) {
    console.log("Error scheduling notification:", error);
  }
};
