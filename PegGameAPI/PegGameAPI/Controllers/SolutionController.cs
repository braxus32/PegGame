using PegGameAPI.Models;
using PegGameAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PegGameAPI.Controllers;

[Route("")]
[ApiController]
public class SolutionController : ControllerBase
{
  public SolutionController()
  {
  }

  [HttpGet]
  public ActionResult<List<Solution>> GetAll() =>
    SolutionService.GetAll();

  [HttpGet("{initSlot:int}/{numRows:int}")]
  public ActionResult<List<int[]>> Get(int initSlot, int numRows)
  {
    return SolutionService.Get(initSlot, numRows);
  }

  //[HttpPost]
  //public ActionResult<>

}
