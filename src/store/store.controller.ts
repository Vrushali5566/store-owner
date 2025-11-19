// Add this endpoint
@Get('my')
@Roles('owner')
async myStore(@Request() req) {
  const ownerId = req.user.id;
  const store = await this.storesService.findByOwner(ownerId);
  return store;
}
@Get('owner/average-rating')
@Roles('owner')
async averageRating(@Request() req) {
  return await this.storesService.getStoreAverageRating(req.user.id);
}
