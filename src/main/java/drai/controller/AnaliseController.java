package drai.controller;

import drai.dto.AnaliseRequest;
import drai.dto.AnaliseResponse;
import drai.service.AnaliseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/analisar")
@CrossOrigin(origins = "*")
public class AnaliseController {

    @Autowired
    private AnaliseService service;

    @PostMapping
    public AnaliseResponse analisar(@RequestBody AnaliseRequest request) {
        return service.analisar(request);
    }
}