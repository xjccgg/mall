package ltd.newbee.mall.controller.mall;


import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import ltd.newbee.mall.common.Constants;
import ltd.newbee.mall.controller.vo.NewBeeMallUserVO;
import ltd.newbee.mall.entity.TbMessage;
import ltd.newbee.mall.interceptor.R;
import ltd.newbee.mall.service.TbMessageService;
import ltd.newbee.mall.util.PageQueryUtil;
import ltd.newbee.mall.util.PageResult;
import ltd.newbee.mall.util.Result;
import ltd.newbee.mall.util.ResultGenerator;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 *  前端控制器
 *
 * @author xujichuang
 * @since 2023-05-04
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/tbMessage")
public class TbMessageController {

    private final TbMessageService tbMessageService;

    /**
     * 分页列表
     *
     * @param page   分页信息
     * @return R
     */
    @GetMapping("/page")
    public Result page(Page<TbMessage> page, HttpServletRequest request) {
        Map<String, String[]> parameterMap = request.getParameterMap();
        String[] limits = parameterMap.get("limit");
        int limit = Integer.parseInt(limits[0]);
        String[] currentPages = parameterMap.get("page");
        int currentPage = Integer.parseInt(currentPages[0]);
        page.setCurrent(currentPage);
        page.setSize(limit);

        Page<TbMessage> result = tbMessageService.page(page);

        int total = result.getRecords().size();
        for(int i = 0;i < (currentPage-1) * limit;i++){
            result.getRecords().remove(result.getRecords().size() - 1);
        }
        for(int i = result.getRecords().size();i > limit;i--){
            result.getRecords().remove(0);
        }

        PageResult pageResult = new PageResult(result.getRecords(), total, limit, currentPage);

        return ResultGenerator.genSuccessResult(pageResult);
    }

    /**
     * 信息
     *
     * @param id Id
     * @return R
     */
    @GetMapping("/get")
    public Result get(@RequestParam String id) {
		return ResultGenerator.genSuccessResult(tbMessageService.getById(id));
	}

    /**
    * 新增或修改
    *
    * @param tbMessage TbMessage 对象
    * @return R
    */
    @PostMapping("/set")
    public Result set(@RequestBody TbMessage tbMessage) {
		return ResultGenerator.genSuccessResult(tbMessageService.saveOrUpdate(tbMessage));
	}

    /**
    * 删除
    *
    * @param ids id字符串，根据,号分隔
    * @return R
    */
    @PostMapping("/del")
    public Result del(@RequestBody List<String> ids) {
		return ResultGenerator.genSuccessResult(tbMessageService.removeByIds(ids));
	}

}

