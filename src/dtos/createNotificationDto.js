function validateCreateNotificationDto(data) {
  const requiredFields = ['userId', 'title', 'message', 'type'];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  return {
    userId: data.userId,
    title: data.title,
    message: data.message,
    type: data.type,
    scheduledFor: data.scheduledFor || null,
    sendEmail: !!data.sendEmail,
    sendPush: !!data.sendPush,
    pushToken: data.pushToken || null
  };
}

module.exports = { validateCreateNotificationDto };
