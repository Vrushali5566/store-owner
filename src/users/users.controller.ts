@Patch('update-password')
@UseGuards(AuthGuard('jwt'))
async updatePassword(@Request() req, @Body() body: { newPassword: string }) {
  return this.usersService.updatePassword(req.user.id, body.newPassword);
}
