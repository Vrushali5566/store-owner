// Add this endpoint
@Get('my')
@Roles('owner')
async myStore(@Request() req) {
  const ownerId = req.user.id;
  const store = await this.storesService.findByOwner(ownerId);
  return store;
}
